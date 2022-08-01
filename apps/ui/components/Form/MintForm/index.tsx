import shallow from "zustand/shallow";
import { useEffect } from "react";
import { BigNumber, ContractTransaction } from "ethers";
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
import axios from "axios";

interface MintFormProps {
  isMultiple?: boolean;
}

export const MintForm = (props: MintFormProps) => {
  const { isMultiple } = props;
  const [
    collection,
    file,
    name,
    attributes,
    description,
    external_url,
    tokenId,
    royalty,
    quantity,
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
      state.royalty,
      state.quantity,
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

  //Load the users collections
  useEffect(() => {
    const erc721CollectionAddress = getERC721CollectionAddress(chainId);
    const erc1155CollectionAddress = getERC721CollectionAddress(chainId);

    if (isMultiple) {
      setActiveCollection({
        name: "CassavaLand",
        address: erc1155CollectionAddress,
      });
    } else {
      setActiveCollection({
        name: "CassavaLand",
        address: erc721CollectionAddress,
      });
    }

    setCollections([{ name: "CassavaLand", address: erc721CollectionAddress }]);
  }, [chainId, setActiveCollection, setCollections, isMultiple]);

  const validateERC721 = () => !file || !erc721 || !account || !name;

  const validateERC1155 = () =>
    !file || !erc1155 || !quantity || !account || !name;

  const validate = () => (isMultiple ? validateERC1155() : validateERC721());

  const handleSubmit = async () => {
    if (validate()) return;

    let trx: ContractTransaction;

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

    //check token standard and if royalty is set
    if (isMultiple) {
      if (parseFloat(royalty) > 0) {
        trx = await erc1155.mintWithRoyalty(
          quantity,
          uri,
          account,
          parseFloat(royalty) * 100
        );
      } else {
        trx = await erc1155.mint(quantity, uri);
      }
    } else {
      if (parseFloat(royalty) > 0) {
        trx = await erc721.mintWithRoyalty(
          uri,
          account,
          parseFloat(royalty) * 100
        );
      } else {
        trx = await erc721.mint(uri);
      }
    }

    Alert("Awaiting confirmation", "info");

    const receipt = await trx.wait();

    setTxHash(receipt.transactionHash);
    updateProgress(2, 3);

    const event = receipt?.events?.find((event) => event.event === "Minted");

    if (event && event.args) {
      const [_creator, tkId, _tokenURI] = event.args;
      const tId = BigNumber.from(tkId).toNumber();
      setTokenId(tId.toString());
      console.log(_creator);
      console.log(tId);

      await axios
        .post(`/api/${chainId.toString()}/collection/asset`, {
          ...metadata,
          token_id: tId.toString(),
          metadata_url: `ipfs://${uri}`,
          owner: account.toLowerCase(),
          asset_contract: collection.address.toLowerCase(),
        })
        .catch((err) => console.log(err));

      console.log("successfull");
    }

    toggleProgressModal();
    setProgress(null);
    toggleNftCreatedModal();
  };

  return (
    <Form>
      <AssetUpload />
      <FormData isMultiple={isMultiple} />
      <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
    </Form>
  );
};
