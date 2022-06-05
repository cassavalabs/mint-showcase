import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import {
  Flex,
  FlexColumn,
  FullWidth,
  Brand,
  NavLink,
  UserCircleIcon,
  media,
  // HelpIcon,
  IconButton,
  MenuIcon,
} from "@cassavaland/uikits";
import Tippy from "@tippyjs/react";
import { ProfileDropdown } from "../Dropdown";
// import { Search } from "../Search";
import { useActiveChainId } from "../../contexts/application";
import { useDarkMode } from "../../contexts/theme";
import { useStore } from "../../state/sidebar";

const Wrapper = styled(FlexColumn)`
  width: 100%;
  position: sticky;
  top: 0rem;
  z-index: 1000;
`;

const Navbar = styled(FullWidth)`
  height: 4.5rem;
  background-color: ${({ theme }) => theme.bg100};
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0rem 1rem;
`;

const NavbarRight = styled(Flex)`
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const SearchBox = styled.div`
  flex-grow: 1;
  ${media.mobileL`
    display: none;
  `}
`;

const MdScreenMenu = styled(Flex)`
  height: 100%;
  align-items: center;
  justify-content: center;
  ${media.tablet`
    display: none;
  `}
`;

const TippyBox = styled.div`
  height: 100%;
`;

const StyledIcon = styled.span`
  padding-right: 0.5rem;
  display: flex;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const RoundImage = styled(Image)`
  border-radius: 50%;
`;

export const Header = () => {
  const [profileInst, setProfileInst] = useState<any>(null);
  const { darkMode } = useDarkMode();
  const setActiveSidebar = useStore((state) => state.setActiveSidebar);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const open = useStore((state) => state.isOpen);
  const { chainId } = useActiveChainId();

  const toggleMobileMenu = () => {
    setActiveSidebar("mobileMenu");
    if (open) return;

    toggleSidebar(true);
  };

  const showSupportedChains = () => {
    setActiveSidebar("authentication");
    toggleSidebar(true);
  };

  return (
    <Wrapper>
      <Navbar>
        <Container>
          <Brand
            logo={darkMode ? "/logo_white.png" : "/logo_dark.png"}
            href="/"
          />
          <SearchBox>
            {/* <Search placeholder="Search items, collections, and accounts" /> */}
          </SearchBox>
          <NavbarRight>
            <MdScreenMenu>
              <NavLink href="/collections">Explore</NavLink>
              <Tippy
                content={
                  profileInst ? <ProfileDropdown hide={profileInst.hide} /> : ""
                }
                interactive
                placement="bottom-start"
                allowHTML
                arrow={false}
                onCreate={setProfileInst}
                offset={[0, 0]}
              >
                <TippyBox>
                  <NavLink href="/account">
                    <StyledIcon>
                      <UserCircleIcon />
                    </StyledIcon>
                    Profile
                  </NavLink>
                </TippyBox>
              </Tippy>
              <NavLink href="/create">Create</NavLink>
            </MdScreenMenu>
            <NavbarRight>
              <IconButton onClick={showSupportedChains}>
                <RoundImage
                  src={`/${chainId ? chainId : 1284}.png`}
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton onClick={toggleMobileMenu}>
                <MenuIcon size={32} />
              </IconButton>
            </NavbarRight>
          </NavbarRight>
        </Container>
      </Navbar>
    </Wrapper>
  );
};
