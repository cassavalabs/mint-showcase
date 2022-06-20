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
  RoundAvatar,
  GradientAvatar,
  CollectiblesIcon,
} from "@cassavaland/uikits";
import { shortenAddress, Account } from "@cassavaland/sdk";

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

const SocialLinks = styled(FlexCenter)`
  margin-bottom: 1rem;
  & > a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const ProfileHeader = ({ user }: { user: Account }) => {
  const { query, asPath, push } = useRouter();
  const { account } = query;
  const isAccount = asPath === "/account";

  const handleOnShown = (instance: any) => {
    setTimeout(() => {
      instance.hide();
    }, 500);
  };

  return (
    <Wrapper>
      <Banner />
      <Profile>
        {user.avatar_uri ? (
          <RoundAvatar
            size={10.5}
            src={user.avatar_uri}
            layout="fill"
            alt={user.display_name ?? "avatar"}
            editable={isAccount}
          />
        ) : (
          <GradientAvatar size={168} seed={user.address} />
        )}
        <ProfileDetails>
          <Text size={2} weight={600} color="text300">
            {user.display_name ?? "Unnamed"}
          </Text>
          <Tippy
            content="Copied"
            trigger="click"
            theme="tooltip"
            onShow={handleOnShown}
          >
            <ProfileWalletAddressButton>
              <Image src="/1284.png" width={16} height={16} alt="account" />
              <span style={{ marginLeft: "0.5rem" }}>
                {shortenAddress(user.address)}
              </span>
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
          {user.bio && <Text mWidth="37rem">{user.bio}</Text>}
          <ButtonGroup>
            <ShareProfileButton>
              <ShareIcon /> Share
            </ShareProfileButton>
            {isAccount && (
              <EditProfileButton onClick={() => push("/account/settings")}>
                <EditIcon /> Edit
              </EditProfileButton>
            )}
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
              <NavLink href={`/${account}`} scroll={false}>
                <StyledIcon>
                  <CollectiblesIcon />
                </StyledIcon>
                Items
              </NavLink>
            </NavbarContainer>
          </ProfileNavbar>
        </ProfileNav>
      </Profile>
    </Wrapper>
  );
};
