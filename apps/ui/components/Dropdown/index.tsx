import styled from "styled-components";
import {
  FullWidth,
  StyledLink,
  ToggleBtn,
  UserIcon,
  LightModeIcon,
  DarkModeIcon,
  CollectionsIcon,
  LogoutIcon,
  LeftIcon,
  SettingsIcon,
  AddFolderIcon,
} from "@cassavaland/uikits";
import Link, { LinkProps } from "next/link";
import { ReactElement } from "react";
import { useDarkMode } from "../../contexts/theme";
import { useAuth } from "../../hooks/useAuth";

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

export const ProfileDropdown = ({ hide }: { hide: any }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isconnected, logout } = useAuth();

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
        <DropdownItemLink href="/account/collection/import" onClick={hide}>
          <>
            <LeftIcon size={1.5}>
              <AddFolderIcon />
            </LeftIcon>
            Import Collection
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
      {isconnected && (
        <DropdownItem>
          <DropdownButton
            onClick={() => {
              logout();
              hide();
            }}
          >
            <LeftIcon size={1.5}>
              <LogoutIcon />
            </LeftIcon>
            Logout
          </DropdownButton>
        </DropdownItem>
      )}
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
