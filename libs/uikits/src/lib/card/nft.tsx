import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import type { NFTCardProps } from "@cassavaland/sdk";
import { rgba } from "polished";
import { Flex, FlexColumn, FlexEnd } from "../styles";
import { IconButton } from "../button";
import { FavouriteIcon, LoveIcon } from "../icons";

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
  max-width: 100%;
  height: auto;
  max-height: 100%;
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

const CardTokenPriceRow = styled(Flex)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text200};
  margin-top: 0.2rem;
`;

const CardTokenNotForSale = styled.div`
  max-width: 100%;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardTokenEdition = styled(CardTokenNotForSale)`
  margin-left: 0.5rem;
`;

const CardTokenHighestBid = styled(CardTokenNotForSale)`
  color: ${({ theme }) => theme.primary100};
  flex-grow: 1;
`;

const LikeButton = styled(IconButton)<{ favourited?: boolean }>`
  padding: 0rem;
  margin-right: 0.25rem;
  color: ${({ favourited, theme }) =>
    favourited ? theme.red100 : theme.text200};

  :hover {
    color: ${({ favourited, theme }) =>
      favourited ? theme.text200 : theme.red100};
  }
`;

const CardLikeCount = styled(CardTokenNotForSale)``;

// const CardFixedPrice = styled(CardTokenNotForSale)`
//   color: ${({ theme }) => theme.text300};
// `;

export const NFTCard = (props: NFTCardProps) => {
  const { token, likes } = props;

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
        <FlexColumn>
          <CardTokenPriceRow>
            <CardTokenNotForSale>Not For Sale</CardTokenNotForSale>
            <Tippy arrow={true} content="Editions" theme="tooltip">
              <CardTokenEdition>1/1</CardTokenEdition>
            </Tippy>
          </CardTokenPriceRow>
          <CardTokenPriceRow>
            <Tippy arrow={true} content={`Highest bid by`} theme="tooltip">
              <CardTokenHighestBid>Bid 0.003 CASA</CardTokenHighestBid>
            </Tippy>
            <FlexEnd>
              <Tippy
                arrow={true}
                content={likes.liked ? "Unfavourite" : "Favourite"}
                theme="tooltip"
              >
                <LikeButton favourited={likes.liked}>
                  {likes.liked ? <LoveIcon /> : <FavouriteIcon />}
                </LikeButton>
              </Tippy>
              <CardLikeCount>{likes.count}</CardLikeCount>
            </FlexEnd>
          </CardTokenPriceRow>
        </FlexColumn>
      </CardBody>
    </Card>
  );
};
