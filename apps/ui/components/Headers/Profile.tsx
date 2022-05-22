import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import {
  Container,
  Flex,
  FlexCenter,
  FlexColumn,
  FullWidth,
  NavLink,
  ProfileWalletAddressButton,
  EditProfileButton,
  ShareProfileButton,
  SocialLink,
  Text,
  media,
  Banner,
  ShareIcon,
  EditIcon,
  HorizontalDivider,
  CollectionsIcon,
  NavButtonLink,
  FolderIcon,
  FavouriteIcon,
  HistoryIcon,
  OfferIcon,
  ChevronDownIcon,
  RoundAvatar,
  GradientAvatar,
  CollectiblesIcon,
} from "@cassavaland/uikits";
import { shortenAddress } from "@cassavaland/sdk";
// import { CreatedDropdown, OffersDropdown } from "../../components/Dropdown";
import { useActiveWeb3 } from "../../hooks/useWeb3";

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  align-items: stretch;
`;

const Profile = styled(Wrapper)`
  position: relative;
  align-items: center;
  margin-top: -5rem;
  margin-bottom: 2rem;

  ${media.mobileL`
    margin-top: -5rem;
    padding-left: 0rem;
    flex-direction: column;
    align-items: center;
  `}
`;

const ProfileDetails = styled(FlexColumn)`
  flex-grow: 1;
  justify-content: center;
  margin-top: 1rem;
`;

const ButtonGroup = styled(FlexCenter)`
  margin-top: 1rem;
`;

const ProfileNav = styled(Flex)`
  width: 100%;
  margin-top: 2rem;
  z-index: 200;
`;

const ProfileNavbar = styled(FullWidth)`
  height: 3rem;
  position: sticky;
  top: 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavbarContainer = styled(FlexCenter)`
  width: 30%;
  height: 100%;
  position: relative;
  padding: 0rem 1rem;
`;

const StyledIcon = styled(Flex)`
  padding-right: 0.5rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const RightIcon = styled(Flex)`
  padding-left: 0.5rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledNumber = styled.span`
  padding-left: 0.5rem;
  display: flex;
  font-size: 0.75rem;
`;

const SocialLinks = styled(FlexCenter)`
  margin-bottom: 1rem;
  & > a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const ProfileHeader = () => {
  const { pathname, query } = useRouter();
  const { account } = query;
  const { chainId, account: walletAddress } = useActiveWeb3();

  const isCreatedPage =
    pathname === "/[account]/items-created" ||
    pathname === "/[account]/collections-created";
  const isBidPage =
    pathname === "/[account]/bids" || pathname === "/[account]/bids-made";

  const handleOnShown = (instance: any) => {
    setTimeout(() => {
      instance.hide();
    }, 500);
  };

  return (
    <Wrapper>
      <Banner />
      <Profile>
        <RoundAvatar
          size={10.5}
          src="/gorilla.jpg"
          layout="fill"
          alt="avatar"
          editable
        />
        <ProfileDetails>
          <Text size={2} weight={600} color="text300">
            Anonymous Plebbit
          </Text>
          <Tippy
            content="Copied"
            trigger="click"
            theme="tooltip"
            onShow={handleOnShown}
          >
            <ProfileWalletAddressButton>
              {chainId && (
                <Image
                  src={`/${chainId}.png`}
                  width={16}
                  height={16}
                  alt="account"
                />
              )}
              {walletAddress && (
                <span style={{ marginLeft: "0.5rem" }}>
                  {shortenAddress(walletAddress)}
                </span>
              )}
            </ProfileWalletAddressButton>
          </Tippy>
          <SocialLinks>
            <SocialLink href="#" text="@cassavaBoy" nature="facebook" />
            <SocialLink
              href="twitter.com"
              text="@cassavaBoy"
              nature="twitter"
            />
          </SocialLinks>
          <Text mWidth="37rem">
            BAYC is a collection of 10,000 Bored Ape NFTs. Owning a Bored Ape
            doubles as your membership to the Club.
          </Text>
          <ButtonGroup>
            <ShareProfileButton>
              <ShareIcon /> Share
            </ShareProfileButton>
            <EditProfileButton>
              <EditIcon /> Edit
            </EditProfileButton>
          </ButtonGroup>
        </ProfileDetails>
        <ProfileNav>
          <ProfileNavbar>
            <HorizontalDivider />
            <NavbarContainer>
              <NavLink href={`/${account}/collections-created`} scroll={false}>
                <StyledIcon>
                  <CollectionsIcon />
                </StyledIcon>
                Collections
              </NavLink>
              <NavLink href={`/${account}/items-created`} scroll={false}>
                <StyledIcon>
                  <CollectiblesIcon />
                </StyledIcon>
                Items
              </NavLink>
              {/* <NavLink href={`/${account}`} scroll={false}>
                <StyledIcon>
                  <CollectionsIcon />
                </StyledIcon>
                Collected
                <StyledNumber>0</StyledNumber>
              </NavLink>
              <Tippy
                content={<CreatedDropdown />}
                interactive
                placement="bottom-start"
                allowHTML
                trigger="click"
                arrow={false}
                offset={[0, 0]}
              >
                <NavButtonLink
                  as="button"
                  className={isCreatedPage ? "active" : ""}
                >
                  <StyledIcon>
                    <FolderIcon />
                  </StyledIcon>
                  Created
                  <RightIcon>
                    <ChevronDownIcon />
                  </RightIcon>
                </NavButtonLink>
              </Tippy> */}
              {/* <NavLink href={`/${account}/favourites`} scroll={false}>
                <StyledIcon>
                  <FavouriteIcon />
                </StyledIcon>
                Favourited
                <StyledNumber>0</StyledNumber>
              </NavLink> */}
              {/* <NavLink href={`/${account}/activity`} scroll={false}>
                <StyledIcon>
                  <HistoryIcon />
                </StyledIcon>
                Activity
                <StyledNumber>0</StyledNumber>
              </NavLink> */}
              {/* <Tippy
                content={<OffersDropdown />}
                interactive
                placement="bottom-start"
                allowHTML
                trigger="click"
                arrow={false}
                offset={[0, 0]}
              >
                <NavButtonLink
                  as="button"
                  className={isBidPage ? "active" : ""}
                >
                  <StyledIcon>
                    <OfferIcon />
                  </StyledIcon>
                  Offers
                  <RightIcon>
                    <ChevronDownIcon />
                  </RightIcon>
                </NavButtonLink>
              </Tippy> */}
            </NavbarContainer>
          </ProfileNavbar>
        </ProfileNav>
      </Profile>
    </Wrapper>
  );
};
