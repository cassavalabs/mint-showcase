import styled from "styled-components";
import {
  FullWidth,
  StyledLink,
  ToggleBtn,
  UserIcon,
  LightModeIcon,
  DarkModeIcon,
  CollectionsIcon,
  PhotosIcon,
  CollectiblesIcon,
  LogoutIcon,
  ArtIcon,
  MusicIcon,
  AllIcon,
  LeftIcon,
  GameIcon,
  FavouriteIcon,
  SettingsIcon,
  BlogIcon,
  GithubIcon,
  DocsIcon,
  CommunityIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "@cassavaland/uikits";
import Link, { LinkProps } from "next/link";
import { ReactElement } from "react";
import { useDarkMode } from "../../contexts/theme";
import { useRouter } from "next/router";

const DropdownContainer = styled(FullWidth)`
  min-width: 13.75rem;
  background-color: ${({ theme }) => theme.bg100};
  border-radius: 0rem 0rem 0.5rem 0.5rem;
`;

const DropdownItem = styled(FullWidth)`
  :not(:last-child) {
    border-bottom: 0.0625rem solid ${({ theme }) => theme.bg300};
  }
`;

const StyledDropdownLink = styled(StyledLink)`
  height: auto;
  font-weight: 600;
`;

const DropdownButton = styled(ToggleBtn)`
  justify-content: flex-start;
`;

interface StyledLinkProps extends LinkProps {
  children: ReactElement;
  onClick?: any;
}

const DropdownItemLink = (props: StyledLinkProps) => {
  const { children, onClick, ...rest } = props;

  return (
    <Link {...rest} passHref>
      <StyledDropdownLink onClick={onClick}>{children}</StyledDropdownLink>
    </Link>
  );
};

export const ExploreDropdown = ({ hide }: { hide: any }) => {
  return (
    <DropdownContainer>
      <DropdownItem>
        <DropdownItemLink href="/collections/all" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <AllIcon />
            </LeftIcon>
            All NFTs
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/collections/art" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <ArtIcon />
            </LeftIcon>
            Art
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/collections/photography" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <PhotosIcon />
            </LeftIcon>
            Photography
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/collections/games" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <GameIcon />
            </LeftIcon>
            Games
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/collections/music" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <MusicIcon />
            </LeftIcon>
            Music
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/collections/collectibles" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <CollectiblesIcon />
            </LeftIcon>
            Collectibles
          </>
        </DropdownItemLink>
      </DropdownItem>
    </DropdownContainer>
  );
};

export const ProfileDropdown = ({ hide }: { hide: any }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <DropdownContainer>
      <DropdownItem>
        <DropdownItemLink href="/account" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <UserIcon />
            </LeftIcon>
            Profile
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/account/favourites" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <FavouriteIcon />
            </LeftIcon>
            Favourites
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/account/collections-created" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <CollectionsIcon />
            </LeftIcon>
            My Collections
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/account/settings" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <SettingsIcon />
            </LeftIcon>
            Settings
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownButton onClick={hide}>
          <LeftIcon size={1.5}>
            <LogoutIcon />
          </LeftIcon>
          Logout
        </DropdownButton>
      </DropdownItem>
      <DropdownItem>
        <DropdownButton onClick={() => toggleDarkMode()}>
          <LeftIcon size={1.5}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </LeftIcon>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </DropdownButton>
      </DropdownItem>
    </DropdownContainer>
  );
};

export const HelpDropdown = ({ hide }: { hide: any }) => {
  return (
    <DropdownContainer>
      <DropdownItem>
        <DropdownItemLink href="/blog" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <BlogIcon />
            </LeftIcon>
            Blog
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/community" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <CommunityIcon />
            </LeftIcon>
            Community
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/developers" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <DocsIcon />
            </LeftIcon>
            Developers
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href="/#" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <GithubIcon />
            </LeftIcon>
            Github
          </>
        </DropdownItemLink>
      </DropdownItem>
    </DropdownContainer>
  );
};

export const OffersDropdown = () => {
  const { query } = useRouter();
  const { account } = query;

  return (
    <DropdownContainer>
      <DropdownItem>
        <DropdownItemLink href={`/${account}/bids`} scroll={false}>
          <>
            <LeftIcon size={1.5}>
              <ArrowDownLeftIcon />
            </LeftIcon>
            Offers received
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink href={`/${account}/bids-made`} scroll={false}>
          <>
            <LeftIcon size={1.5}>
              <ArrowUpRightIcon />
            </LeftIcon>
            Offers made
          </>
        </DropdownItemLink>
      </DropdownItem>
    </DropdownContainer>
  );
};

export const CreatedDropdown = () => {
  const { query } = useRouter();
  const { account } = query;

  return (
    <DropdownContainer>
      <DropdownItem>
        <DropdownItemLink href={`/${account}/items-created`} scroll={false}>
          <>
            <LeftIcon size={1.5}>
              <CollectiblesIcon />
            </LeftIcon>
            Items
          </>
        </DropdownItemLink>
      </DropdownItem>
      <DropdownItem>
        <DropdownItemLink
          href={`/${account}/collections-created`}
          scroll={false}
        >
          <>
            <LeftIcon size={1.5}>
              <CollectionsIcon />
            </LeftIcon>
            Collections
          </>
        </DropdownItemLink>
      </DropdownItem>
    </DropdownContainer>
  );
};
