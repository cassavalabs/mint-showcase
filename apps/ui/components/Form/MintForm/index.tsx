import shallow from "zustand/shallow";
import { useEffect } from "react";
import {
  CREATE_NFT_STEPS,
  pinFileToIPFS,
  pinJSONToIPFS,
  TokenMetaData,
  validateDataMetaAttributes,
  getERC721CollectionAddress,
} from "@cassavaland/sdk";
import { Alert } from "@cassavaland/uikits";
import { AssetUpload } from "./AssetUpload";
import { FormData } from "./FormData";
import { Form, SubmitButton } from "../Styles";
import { useStore } from "../../../state/mintForm";
import { useProgressStore } from "../../../state/progress";
import { useActiveWeb3 } from "../../../hooks/useWeb3";
import { useModal } from "../../../contexts/application";
import {
  useERC721CassavaContract,
  useERC1155CassavaContract,
} from "../../../hooks/useContract";

export const MintForm = () => {
  const [
    collection,
    file,
    name,
    attributes,
    description,
    external_url,
    tokenId,
    setTokenId,
    setActiveCollection,
    setCollections,
    setTxHash,
  ] = useStore(
    (state) => [
      state.activeCollection,
      state.rawFile,
      state.name,
      state.attributes,
      state.description,
      state.external_url,
      state.tokenId,
      state.setTokenId,
      state.setActiveCollection,
      state.setCollections,
      state.setTxHash,
    ],
    shallow
  );

  const { toggleProgressModal, toggleNftCreatedModal } = useModal();

  const erc721 = useERC721CassavaContract(collection.address);
  const erc1155 = useERC1155CassavaContract(collection.address);
  const { account, chainId } = useActiveWeb3();
  const [setProgress, updateProgress] = useProgressStore(
    (state) => [state.setProgress, state.updateProgress],
    shallow
  );

  useEffect(() => {
    const erc721CollectionAddress = getERC721CollectionAddress(chainId);
    const erc1155CollectionAddress = getERC721CollectionAddress(chainId);
    setActiveCollection({
      name: "CassavaLand",
      address: erc721CollectionAddress,
    });
    setCollections([{ name: "CassavaLand", address: erc721CollectionAddress }]);
  }, [chainId, setActiveCollection, setCollections]);

  const validate = () => !file || !erc721 || !account || !name;

  const handleSubmit = async () => {
    if (validate()) return;

    setProgress(CREATE_NFT_STEPS);
    toggleProgressModal();

    const { image } = await pinFileToIPFS(file);
    updateProgress(0, 1);

    const metadata: TokenMetaData = {
      attributes: validateDataMetaAttributes(attributes),
      description,
      external_url,
      image,
      name,
    };

    const { uri } = await pinJSONToIPFS(metadata);
    updateProgress(1, 2);

    const tx = await erc721.mint(uri);
    Alert("Awaiting confirmation", "info");
    const receipt = await tx.wait();
    setTxHash(receipt.transactionHash);
    updateProgress(2, 3);

    const event = receipt?.events?.find((event) => event.event === "Minted");

    if (event && event.args) {
      const [_creator, tkId, _tokenURI] = event.args;
      setTokenId(tkId);
      console.log(_creator);
      console.log(tkId);
      console.log(_tokenURI);
    }

    toggleProgressModal();
    setProgress(null);
    toggleNftCreatedModal();
  };

  return (
    <Form>
      <AssetUpload />
      <FormData />
      <SubmitButton onClick={handleSubmit} disabled={validate()}>
        Create
      </SubmitButton>
    </Form>
  );
};
