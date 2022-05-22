import styled from "styled-components";
import { darken } from "polished";
import Link from "next/link";
import Image from "next/image";
import {
  Flex,
  FlexBetween,
  FlexCenter,
  FlexColumn,
  FlexStart,
} from "../styles";
import { Text } from "../text";
import { PrimaryButton } from "../button";
import { InfoIcon } from "../icons";
import media from "../theme/media";

const Wrapper = styled(FlexCenter)`
  position: relative;
  min-height: calc(100vh - 7rem);
  padding-top: 2rem;
`;

const HeroBackdrop = styled(Flex)<{ bg?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme, bg }) =>
    `${theme.bg100} url(${bg}) center center/cover no-repeat border-box border-box fixed`};
  filter: blur(0.4rem);
  opacity: 0.2;
  mask: linear-gradient(white, transparent);
  z-index: -1;
`;

const Row = styled(Flex)`
  flex-wrap: wrap;
  margin-right: auto;
  margin-left: auto;
  & > div:nth-child(2) {
    align-items: flex-end;
  }
  ${media.tabletL`
  flex-direction: column;
  align-items: center;
  & > div {
    max-width: 100%;
    align-items: center;
    margin-top: 2rem;
    text-align: center;
  }
  & > div:nth-child(2) {
    align-items: center;
  }
  `};
`;

const Column = styled(FlexColumn)`
  width: 100%;
  max-width: calc(50% - 0.5rem);
  padding: 0rem 2rem;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 3rem;
  color: ${({ theme }) => theme.text300};
  font-weight: 600;
  text-align: left;
  line-height: 1.2;

  ${media.tabletL`
    text-align: center;
  `};
`;

const SubTitle = styled(Text)`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  text-align: left;

  ${media.tabletL`
    text-align: center;
  `};
`;

const ButtonGroup = styled(FlexStart)`
  margin-top: 2rem;
  & > button:first-child {
    margin-right: 1rem;
  }
`;

const ExploreButton = styled(PrimaryButton)`
  width: 10rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const CreateButton = styled(ExploreButton)`
  background-color: transparent;
  border-color: ${({ theme }) => theme.bg700};
  :hover {
    background-color: ${({ theme }) => theme.bg700};
  }
`;

const FeaturedCard = styled(FlexColumn)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 34rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const FeaturedImage = styled(FlexColumn)`
  position: relative;
  width: 100%;
  min-height: 26rem;
  height: 100%;
  background-color: ${({ theme }) => theme.bg100};
`;

const FeaturedProfile = styled(Flex)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.bg100};
  z-index: 2;
`;

const ProfileDetails = styled(FlexColumn)`
  margin-left: 0.5rem;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  border: 0.5rem solid ${({ theme }) => theme.primary100};
`;

const StyledLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
  text-decoration: none;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${({ theme }) => darken(0.2, theme.text300)};
  }
`;

const ProfileLink = styled(StyledLink)`
  color: ${({ theme }) => theme.primary100};
  :hover {
    color: ${({ theme }) => darken(0.2, theme.primary100)};
  }
`;

export const HomeHero = () => {
  return (
    <Wrapper>
      <Row>
        <Column>
          <Title>Discover, collect, and sell extraordinary NFTs</Title>
          <SubTitle>
            CassavaLand is the best platform to create, showcase and market NFTs
            across multiple blockchains.
          </SubTitle>
          <ButtonGroup>
            <Link href="/explore">
              <ExploreButton>Explore</ExploreButton>
            </Link>
            <Link href="/create">
              <CreateButton>Create</CreateButton>
            </Link>
          </ButtonGroup>
        </Column>
        <Column>
          <FeaturedCard>
            <FeaturedImage>
              <Link href="/collection" passHref>
                <StyledLink>
                  <Image src="/gorilla.jpg" layout="fill" objectFit="cover" />
                </StyledLink>
              </Link>
            </FeaturedImage>
            <FeaturedProfile>
              <Link href="/profile" passHref>
                <StyledLink>
                  <ProfileImage
                    width={48}
                    height={48}
                    src="/gorilla.jpg"
                    alt="featured"
                  />
                </StyledLink>
              </Link>
              <FlexBetween full>
                <ProfileDetails>
                  <Link href="/collection" passHref>
                    <StyledLink>Gorilla#38</StyledLink>
                  </Link>
                  <Link href="/profile" passHref>
                    <ProfileLink>CassavaBoy</ProfileLink>
                  </Link>
                </ProfileDetails>
                <InfoIcon size={24} />
              </FlexBetween>
            </FeaturedProfile>
          </FeaturedCard>
        </Column>
      </Row>
      <HeroBackdrop bg="/gorilla.jpg" />
    </Wrapper>
  );
};
