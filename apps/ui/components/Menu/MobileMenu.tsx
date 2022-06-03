import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import {
  Flag,
  FlexColumn,
  ExternalLink,
  InternalLink,
  LeftIcon,
  RightIcon,
  FullWidth,
  FlexBetween,
  ToggleButton,
  MenuContainer,
  media,
  LightModeIcon,
  DarkModeIcon,
  AllIcon,
  TwitterIcon,
  InstagramIcon,
  DiscordIcon,
  TelegramIcon,
  MediumIcon,
  CircleCheckIcon,
  ChevronRightIcon,
  ExploreIcon,
  GithubIcon,
  WalletIcon,
  LanguageIcon,
  ChevronLeftIcon,
} from "@cassavaland/uikits";
import { useLocale } from "../../contexts/localization";
import { useDarkMode } from "../../contexts/theme";
import { useStore } from "../../state/sidebar";
import { Search } from "../Search";
import {
  SUPPORTED_LOCALES,
  LOCALE_LABEL,
  SupportedLocale,
} from "../../configs/localization";

const MenuItem = styled(FullWidth)`
  min-height: 5rem;
  height: 5rem;

  :not(:last-child) {
    border-bottom: 0.0625rem solid ${({ theme }) => theme.bg300};
  }
`;

const MenuItems = styled(FlexColumn)`
  min-height: calc(100vh - 11.75rem);
`;

const MenuFooterWrapper = styled(MenuItem)`
  display: flex;
  background-color: ${({ theme }) => theme.bg100};
  align-items: center;
  justify-content: center;
`;

const SocialIcon = styled.div`
  width: 2rem;
  height: 2rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GroupSocialLinks = styled(FlexBetween)`
  max-width: 15rem;
`;

const SocialLink = styled(ExternalLink)`
  height: 1.25rem;
  padding: 0rem;
  max-width: 2rem;
`;

const SearchBoxWrapper = styled(MenuItem)`
  ${media.atLeastMobileL`
  display: none;
`};
`;

const MenuFooter = () => {
  return (
    <MenuFooterWrapper>
      <GroupSocialLinks>
        <SocialLink href="https://twitter.com/cassavaswap">
          <SocialIcon>
            <TwitterIcon />
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://instagram.com/cassavaswap">
          <SocialIcon>
            <InstagramIcon />
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://discord.gg/cassavaswap">
          <SocialIcon>
            <DiscordIcon />
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://t.me/cassavaswap">
          <SocialIcon>
            <TelegramIcon />
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://medium.com/@cassavaswap">
          <SocialIcon>
            <MediumIcon />
          </SocialIcon>
        </SocialLink>
      </GroupSocialLinks>
    </MenuFooterWrapper>
  );
};

interface LanguageMenuItemProps {
  locale: SupportedLocale;
}

const getCountry = (locale: SupportedLocale) => locale.split("-")[1];

const LanguageMenuItem = (props: LanguageMenuItemProps) => {
  const { locale } = props;
  const { asPath } = useRouter();
  const { userLocale, setUserLocale } = useLocale();

  return (
    <Fragment>
      <InternalLink href={asPath} onClick={() => setUserLocale(locale)}>
        <LeftIcon>
          <Flag countryCode={getCountry(locale)} />
        </LeftIcon>
        {LOCALE_LABEL[locale]}
        {userLocale === locale && (
          <RightIcon>
            <CircleCheckIcon color="#24cc85" />
          </RightIcon>
        )}
      </InternalLink>
    </Fragment>
  );
};

const LanguageMenu = () => {
  return (
    <Fragment>
      {SUPPORTED_LOCALES.map((locale) => (
        <LanguageMenuItem key={locale} locale={locale} />
      ))}
    </Fragment>
  );
};

type Menu = "account" | "explore" | "lang" | "main";

export const MobileMenu = () => {
  const { userLocale } = useLocale();
  const { account } = useWeb3React();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const setActiveSidebar = useStore((state) => state.setActiveSidebar);
  const open = useStore((state) => state.isOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const [menu, setMenu] = useState<Menu>("main");

  useEffect(() => {
    if (!open) {
      setMenu("main");
    }
  }, [open]);

  return (
    <Fragment>
      <MenuContainer show={menu === "main"}>
        <MenuItems>
          <SearchBoxWrapper>
            <Search full placeholder="Search items, collections and accounts" />
          </SearchBoxWrapper>
          <MenuItem>
            <ToggleButton
              rightIcon={<ChevronRightIcon />}
              leftIcon={<ExploreIcon />}
              title="Explore"
              onClick={() => setMenu("explore")}
            />
          </MenuItem>
          <MenuItem>
            <ExternalLink
              href="https://github.com/cassavaland"
              onClick={() => toggleSidebar(false)}
            >
              <LeftIcon>
                <GithubIcon />
              </LeftIcon>
              Github
            </ExternalLink>
          </MenuItem>
          <MenuItem>
            <ToggleButton
              leftIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              title={darkMode ? "Light Mode" : "Dark Mode"}
              onClick={() => toggleDarkMode()}
            />
          </MenuItem>
          <MenuItem>
            {account ? (
              <ToggleButton
                rightIcon={<ChevronRightIcon />}
                leftIcon={<WalletIcon />}
                title="Account"
                onClick={() => setMenu("account")}
              />
            ) : (
              <ToggleButton
                leftIcon={<WalletIcon />}
                title="Connect Wallet"
                onClick={() => setActiveSidebar("authentication")}
              />
            )}
          </MenuItem>
          <MenuItem>
            <ToggleButton
              rightIcon={<Flag countryCode={getCountry(userLocale)} />}
              leftIcon={<LanguageIcon />}
              title="Language"
              onClick={() => setMenu("lang")}
            />
          </MenuItem>
        </MenuItems>
        <MenuFooter />
      </MenuContainer>
      <MenuContainer show={menu === "lang"}>
        <MenuItems>
          <MenuItem>
            <ToggleButton
              leftIcon={<ChevronLeftIcon />}
              title="Go back"
              onClick={() => setMenu("main")}
            />
          </MenuItem>
          <LanguageMenu />
        </MenuItems>
        <MenuFooter />
      </MenuContainer>
      <MenuContainer show={menu === "explore"}>
        <MenuItems>
          <MenuItem>
            <ToggleButton
              leftIcon={<ChevronLeftIcon />}
              title="Go back"
              onClick={() => setMenu("main")}
            />
          </MenuItem>
          <MenuItem>
            <InternalLink href="/collections">
              <LeftIcon>
                <AllIcon />
              </LeftIcon>
              All NFTs
            </InternalLink>
          </MenuItem>
        </MenuItems>
        <MenuFooter />
      </MenuContainer>
      <MenuContainer show={menu === "account"}>
        <MenuItems>
          <MenuItem>
            <ToggleButton
              leftIcon={<ChevronLeftIcon />}
              title="Go back"
              onClick={() => setMenu("main")}
            />
          </MenuItem>
        </MenuItems>
      </MenuContainer>
    </Fragment>
  );
};
