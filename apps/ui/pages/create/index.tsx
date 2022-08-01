import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BoxedPage,
  FormRow,
  FormColumn,
  Page,
  Text,
  FormGroup,
  PrimaryButton,
} from "@cassavaland/uikits";
import { BaseChainInfo, CHAIN_INFO } from "@cassavaland/sdk";
import { useActiveWeb3 } from "../../hooks/useWeb3";

export default function SelectCollectionType() {
  const [activeChainInfo, setActiveChainInfo] = useState<BaseChainInfo | null>(
    null
  );
  const { chainId } = useActiveWeb3();
  const router = useRouter();

  useEffect(() => {
    setActiveChainInfo(CHAIN_INFO[chainId]);
  }, [chainId]);

  return (
    <Page centered>
      <BoxedPage>
        <Text size={3.5} weight={700} color="text300" textAlign="left">
          Select Collection Type
        </Text>
        <Text size={1.25} textAlign="left" margin="0rem 0rem 1rem 0rem">
          You are currently connected to{" "}
          {activeChainInfo ? activeChainInfo.chainName : "no blockchain"}{" "}
          Network, select single if you do like to create a one of a kind NFT
          (BRC721) or multiple if you want BRC1155 (coming soon) compatible NFTs.
        </Text>
        <FormGroup>
          <FormRow>
            <FormColumn>
              <PrimaryButton
                disabled={!activeChainInfo}
                onClick={() => router.push("/create/brc721")}
              >
                Single
              </PrimaryButton>
            </FormColumn>
            <FormColumn>
              <PrimaryButton
                disabled
                onClick={() => router.push("/create/brc1155")}
              >
                Multiple
              </PrimaryButton>
            </FormColumn>
          </FormRow>
        </FormGroup>
      </BoxedPage>
    </Page>
  );
}
