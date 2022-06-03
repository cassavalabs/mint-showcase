import { useEffect, useState } from "react";
import axios from "axios";
import {
  BoxedPage,
  Page,
  Text,
  Textbox,
  FormGroup,
  PrimaryButton,
  Alert,
} from "@cassavaland/uikits";
import { BaseChainInfo, CHAIN_INFO, isAddress } from "@cassavaland/sdk";
import { useActiveWeb3 } from "../../../hooks/useWeb3";

export default function ImportCollection() {
  const [activeChainInfo, setActiveChainInfo] = useState<BaseChainInfo | null>(
    null
  );
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const { chainId } = useActiveWeb3();

  useEffect(() => {
    setActiveChainInfo(CHAIN_INFO[chainId]);
  }, [chainId]);

  const handleSubmit = async () => {
    setErr("");
    setLoading(true);
    const data = await axios.post(
      `/api/${chainId.toString()}/collection/import`,
      { address }
    );
    setLoading(false);
    if (data.data && data.data.contract) {
      Alert(`${data.data.contract.standard} Imported successfully`, "success");
      setAddress("");
    } else {
      setErr(data.data.error);
    }
  };

  return (
    <Page centered>
      <BoxedPage>
        <Text size={3.5} weight={700} color="text300" textAlign="left">
          Import Collection
        </Text>
        <Text size={1.25} textAlign="left" margin="0rem 0rem 1rem 0rem">
          Before you proceed, ensure you have the correct address for your
          ERC721 or ERC1155 contract deployed to the{" "}
          {activeChainInfo ? activeChainInfo.chainName : "connected"} Network
        </Text>
        <Textbox
          label=""
          placeholder="Enter your collection address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <FormGroup>
          {err && (
            <Text color="red100" textAlign="left" weight={500}>
              {err}
            </Text>
          )}
        </FormGroup>
        <FormGroup>
          <PrimaryButton
            disabled={!activeChainInfo || !isAddress(address) || loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </PrimaryButton>
        </FormGroup>
      </BoxedPage>
    </Page>
  );
}
