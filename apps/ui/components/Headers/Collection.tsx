import styled from "styled-components";
import { darken } from "polished";
import Image from "next/image";
import {
  Container,
  CollectionsIcon,
  FlexColumn,
  FlexCenter,
  RoundAvatar,
  Flex,
  FullWidth,
  NavLink,
  HorizontalDivider,
  Banner,
  media,
  Text,
  SocialLink,
} from "@cassavaland/uikits";
import { useRouter } from "next/router";

export const HeaderWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  align-items: center;
`;

export const HeaderContainer = styled(HeaderWrapper)`
  margin-top: -5rem;
  margin-bottom: 2rem;
  ${media.mobileL`
    margin-top: -5rem;
    padding-left: 0rem;
    flex-direction: column;
    align-items: center;
  `}
`;

const SocialLinks = styled(FlexCenter)`
  margin-bottom: 1rem;
  margin-top: 1rem;
  & > a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const StatsRow = styled(FlexCenter)`
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const StatsBox = styled(FlexColumn)`
  width: 8.5rem;
  height: 5.5625rem;
  padding: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  border-radius: 0.5rem;
`;

const StatsBoxSubtitle = styled(Text)`
  font-size: 0.875rem;
  line-height: 1.5;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary100};
  font-weight: 600;
  transition: all 0.5s ease-in-out;
  :hover {
    color: ${({ theme }) => darken(0.1, theme.primary100)};
  }
`;

const Nav = styled(Flex)`
  margin-top: 2rem;
`;

const Navbar = styled(FullWidth)`
  height: 3rem;
`;

const NavContainer = styled(FlexCenter)`
  height: 100%;
  position: relative;
  padding: 0rem 1rem;
`;

const StyledIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const CoverImage = styled(Image)`
  border-radius: 50%;
`;

export const CollectionHeader = () => {
  const { query } = useRouter();
  const { collection } = query;

  return (
    <HeaderWrapper>
      <Banner />
      <HeaderContainer>
        <RoundAvatar
          size={10.5}
          src="/gorilla.jpg"
          layout="fill"
          alt="cassava"
        />
      </HeaderContainer>
      <Text color="text300">
        Created by <ProfileLink href="#">Cassavaboy</ProfileLink>
      </Text>
      <Text size={2.5} weight={600} color="text300">
        THE REBELS by House of Kalinkin
      </Text>
      <SocialLinks>
        <SocialLink href="#" text="@cassavaBoy" nature="facebook" />
        <SocialLink href="twitter.com" text="@cassavaBoy" nature="twitter" />
        <SocialLink href="discord.com" text="@cassavaBoy" nature="discord" />
      </SocialLinks>
      <StatsRow>
        <StatsBox>
          <StatsBoxSubtitle>Items</StatsBoxSubtitle>
          <Text size={1.5} color="text300" weight={600}>
            9.4K
          </Text>
        </StatsBox>
        <StatsBox>
          <StatsBoxSubtitle>Owners</StatsBoxSubtitle>
          <Text size={1.5} color="text300" weight={600}>
            --
          </Text>
        </StatsBox>
      </StatsRow>
      <Text mWidth="37rem">
        BAYC is a collection of 10,000 Bored Ape NFTs. Owning a Bored Ape
        doubles as your membership href the Club.
      </Text>
      <Nav>
        <Navbar>
          <HorizontalDivider />
          <NavContainer>
            <NavLink href={`/collection/${collection}`} scroll={false}>
              <StyledIcon>
                <CollectionsIcon />
              </StyledIcon>
              Items
            </NavLink>
          </NavContainer>
        </Navbar>
      </Nav>
    </HeaderWrapper>
  );
};
