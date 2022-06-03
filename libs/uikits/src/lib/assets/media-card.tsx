import styled from "styled-components";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import { CHAIN_INFO } from "@cassavaland/sdk";
import { FlexColumn, FlexBetween } from "../styles";

const BaseCard = styled(FlexColumn)`
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const CardHeader = styled(FlexBetween)`
  background-color: ${({ theme }) => theme.bg300};
  padding: 0.8rem 1rem;
`;

const CardBody = styled(FlexColumn)`
  width: 100%;
  min-height: 15rem;
  max-height: 63rem;
`;

const MediaContainer = styled(FlexColumn)`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface MediaProps {
  //   mediaType?: "image" | "video" | "audio";
  src: string;
  blockchain: string;
}

export const MediaCard = (props: MediaProps) => {
  const { src, blockchain } = props;
  const chainInfo = CHAIN_INFO[parseInt(blockchain)];

  return (
    <BaseCard>
      <CardHeader>
        {blockchain && (
          <Tippy content={`Blockchain: ${chainInfo.chainName}`} theme="tooltip">
            <div style={{ cursor: "pointer" }}>
              <Image
                src={`/${blockchain}.png`}
                width={16}
                height={16}
                alt={chainInfo.chainName}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </Tippy>
        )}
      </CardHeader>
      <CardBody>
        <MediaContainer>
          <Image layout="fill" objectFit="cover" src={src} />
        </MediaContainer>
      </CardBody>
    </BaseCard>
  );
};
