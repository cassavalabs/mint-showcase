import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import type { NFTCardProps } from "@cassavaland/sdk";
import { rgba } from "polished";
import { FlexColumn } from "../styles";

const Card = styled(FlexColumn)`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.bg100};
  border: 0.1rem solid ${({ theme }) => theme.secondary100};
  border-radius: 1rem;
  overflow: hidden;
`;

const CardBody = styled(FlexColumn)`
  padding: 1rem;
`;

const CardLink = styled.a`
  position: relative;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  line-height: 1.5rem;
`;

const CardHeader = styled(FlexColumn)`
  min-height: 14.5rem;
  height: 14.5rem;
`;

const TokenImage = styled(Image)`
  border-radius: 0.375rem;
`;

const CardTokenTitle = styled(CardLink)`
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
  flex-direction: row;
  justify-content: flex-start;
  transition: all 0.3s ease-in-out;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :hover {
    color: ${({ theme }) => rgba(theme.text300, 0.5)};
  }
`;

export const NFTCard = (props: NFTCardProps) => {
  const { token } = props;

  return (
    <Card>
      <CardHeader>
        <Link href={token.url} passHref>
          <CardLink>
            <TokenImage
              src={token.image}
              alt={token.name}
              title={token.name}
              layout="fill"
              objectFit="cover"
            />
          </CardLink>
        </Link>
      </CardHeader>
      <CardBody>
        <Link href={token.name} passHref>
          <CardTokenTitle>
            <span>{token.name}</span>
          </CardTokenTitle>
        </Link>
      </CardBody>
    </Card>
  );
};
