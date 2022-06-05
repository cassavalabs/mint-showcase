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
  GradientAvatar,
} from "@cassavaland/uikits";
import { CollectionCardProps, walletNameId } from "@cassavaland/sdk";
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

export const CollectionHeader = ({
  collection,
}: {
  collection: CollectionCardProps;
}) => {
  const { owner, banner_image_uri, facebook, discord, telegram, twitter } =
    collection;

  return (
    <HeaderWrapper>
      <Banner />
      <HeaderContainer>
        {owner.avatar_uri ? (
          <RoundAvatar
            size={10.5}
            src={owner.avatar_uri}
            layout="fill"
            alt={owner.display_name}
          />
        ) : (
          <GradientAvatar seed={owner.address} size={168} />
        )}
      </HeaderContainer>
      <Text color="text300">
        Created by{" "}
        <ProfileLink
          href={`/${owner.username ? owner.username : owner.address}`}
        >
          {owner.display_name
            ? owner.display_name
            : walletNameId(owner.address)}
        </ProfileLink>
      </Text>
      <Text size={2.5} weight={600} color="text300">
        {collection.name}
      </Text>
      <SocialLinks>
        {facebook && (
          <SocialLink href={facebook} text={facebook} nature="facebook" />
        )}
        {twitter && (
          <SocialLink href={twitter} text={twitter} nature="twitter" />
        )}
        {discord && (
          <SocialLink href={discord} text={discord} nature="discord" />
        )}
        {telegram && (
          <SocialLink href={telegram} text={telegram} nature="discord" />
        )}
      </SocialLinks>
      <StatsRow>
        <StatsBox>
          <StatsBoxSubtitle>Items</StatsBoxSubtitle>
          <Text size={1.5} color="text300" weight={600}>
            {collection.total_supply}
          </Text>
        </StatsBox>
        <StatsBox>
          <StatsBoxSubtitle>Owners</StatsBoxSubtitle>
          <Text size={1.5} color="text300" weight={600}>
            --
          </Text>
        </StatsBox>
      </StatsRow>
      <Text mWidth="37rem">{collection.description}</Text>
      <Nav>
        <Navbar>
          <HorizontalDivider />
          <NavContainer>
            <NavLink
              href={`/collection/${collection.blockchain}/${
                collection.slug ? collection.slug : collection.address
              }`}
              scroll={false}
            >
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
