import styled from "styled-components";
// import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import type { NFTCardProps } from "@cassavaland/sdk";
import { rgba } from "polished";
import { Flex, FlexColumn, FlexBetween, FlexEnd } from "../styles";
import { Identicon } from "../identicon";
import { IconButton } from "../button";
import { FavouriteIcon, LoveIcon, MoreIcon } from "../icons";

const CardWrapper = styled(FlexColumn)`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.bg100};
  border: 0.1rem solid ${({ theme }) => theme.secondary100};
  border-radius: 1rem;
  overflow: hidden;
`;

const CardContainer = styled(FlexColumn)`
  position: relative;
  height: 100%;
  padding: 1rem;
`;

const CardHeader = styled(FlexBetween)``;

const CardHeaderLeft = styled(Flex)`
  width: fit-content;
  & > :not(:first-child) {
    margin-left: -0.8rem;
  }
`;

const CardHeaderRight = styled(Flex)`
  width: fit-content;
`;

const MoreButton = styled(IconButton)`
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 100%;
  padding: 0rem;
  :hover {
    background-color: ${({ theme }) => theme.bg200};
  }
`;

const CardBody = styled(FlexColumn)`
  margin-top: 1.5rem;
`;

const BaseUrl = styled.a`
  display: flex;
  text-decoration: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text300};
`;

const IdenticonLink = styled(BaseUrl)`
  transition: transform 0.3s ease-in-out;
  z-index: 12;
  :hover {
    transform: translateY(-0.45rem);
    z-index: 15;
  }
`;

const CardLink = styled.a`
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

const CardTokenImageContainer = styled(FlexColumn)`
  min-height: 14.5rem;
  height: 14.5rem;
`;

const CardTokenImage = styled.img`
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
  margin-top: 1rem;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :hover {
    color: ${({ theme }) => rgba(theme.text300, 0.5)};
  }
`;

const CardTokenPriceColumns = styled(FlexColumn)``;

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

const CardLike = styled(FlexEnd)`
  width: fit-content;
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
  const { creator, collection, owner, token, likes } = props;

  return (
    <CardWrapper>
      <CardContainer>
        <CardHeader>
          <CardHeaderLeft>
            <Tippy
              arrow={true}
              content={`Collection: ${collection.name}`}
              theme="tooltip"
            >
              <div>
                <Link href={collection.url} passHref>
                  <IdenticonLink>
                    <Identicon
                      image={collection.avatar}
                      verified={collection.verified}
                    />
                  </IdenticonLink>
                </Link>
              </div>
            </Tippy>
            <Tippy
              arrow={true}
              content={`Creator: ${creator.name}`}
              theme="tooltip"
            >
              <div>
                <Link href={creator.url} passHref>
                  <IdenticonLink>
                    <Identicon
                      image={creator.avatar}
                      verified={creator.verified}
                    />
                  </IdenticonLink>
                </Link>
              </div>
            </Tippy>
            {owner && (
              <Tippy
                arrow={true}
                content={`Owner: ${owner?.name}`}
                theme="tooltip"
              >
                <div>
                  <Link href={owner.url} passHref>
                    <IdenticonLink>
                      <Identicon
                        image={owner.avatar}
                        verified={owner.verified}
                      />
                    </IdenticonLink>
                  </Link>
                </div>
              </Tippy>
            )}
          </CardHeaderLeft>
          <CardHeaderRight>
            <MoreButton>
              <MoreIcon />
            </MoreButton>
          </CardHeaderRight>
        </CardHeader>
        <CardBody>
          <CardTokenImageContainer>
            <Link href={token.url} passHref>
              <CardLink>
                <CardTokenImage
                  src={token.image}
                  alt={token.name}
                  title={token.name}
                />
              </CardLink>
            </Link>
          </CardTokenImageContainer>
          <Link href={token.name} passHref>
            <CardTokenTitle>
              <span>{token.name}</span>
            </CardTokenTitle>
          </Link>
          <CardTokenPriceColumns>
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
              <CardLike>
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
              </CardLike>
            </CardTokenPriceRow>
          </CardTokenPriceColumns>
        </CardBody>
      </CardContainer>
    </CardWrapper>
  );
};
