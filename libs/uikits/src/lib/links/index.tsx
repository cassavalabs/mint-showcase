import styled from "styled-components";
import type { ReactNode } from "react";
import { darken, rgba } from "polished";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import media from "../theme/media";
import {
  FaceBookFIcon,
  DiscordIcon,
  TelegramIcon,
  InstagramIcon,
  TwitterIcon,
} from "../icons";

const activeclassname = "active";

export const StyledLink = styled.a`
  display: flex;
  height: 100%;
  line-height: 1;
  padding: 1rem;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text200};
  text-decoration: none;
  border: 0.1rem solid transparent;
  transition: all 0.25s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.text300};
    background-color: ${({ theme }) => theme.bg100};
    text-decoration: none;
  }
`;

export const StyledTextLink = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.primary400};
  max-width: 26rem;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${({ theme }) => rgba(theme.primary400, 0.7)};
  }
`;

const StyledNavLink = styled(StyledLink)`
  position: relative;
  white-space: nowrap;
  line-height: 1.5;
  font-weight: 600;
  padding: 0rem 1rem;
  justify-content: center;
  border-width: 0rem;
  ::after {
    content: "";
    width: 0rem;
    height: 0.25rem;
    position: absolute;
    bottom: 0rem;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
    background-color: ${({ theme }) => theme.primary100};
    transition: all 0.3s ease-in-out;
  }

  &.${activeclassname} {
    color: ${({ theme }) => theme.text300};
    ::after {
      width: 100%;
      height: 0.25rem;
    }
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text300)};
  }
`;

export const NavButtonLink = styled(StyledNavLink)`
  background: transparent;
  cursor: pointer;
`;

const BrandLink = styled.a`
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.text200};
  margin-right: 1rem;
  display: flex;
  align-items: center;

  ${media.atLeastLaptopM`
  margin-right: 14rem;
`};
`;

interface CommonLinkProps extends LinkProps {
  children: ReactNode;
  onClick?: () => void;
}

export const NavLink = (props: CommonLinkProps) => {
  const { children, ...rest } = props;
  const { asPath, pathname } = useRouter();

  const isActive = asPath === props.href || pathname === props.href;

  return (
    <Link {...rest} passHref>
      <StyledNavLink className={isActive ? "active" : ""}>
        {children}
      </StyledNavLink>
    </Link>
  );
};

interface BrandProps extends LinkProps {
  logo: string;
  href: string;
}

export const Brand = (props: BrandProps) => {
  const { logo, href } = props;

  return (
    <BrandLink href={href}>
      <Image src={logo} alt="logo" width="200px" height="100%" />
    </BrandLink>
  );
};

export const InternalLink = (props: CommonLinkProps) => {
  const { children, onClick, ...rest } = props;

  return (
    <Link {...rest} passHref>
      <StyledLink onClick={onClick}>{children}</StyledLink>
    </Link>
  );
};

export const TextLink = (props: CommonLinkProps) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest} passHref>
      <StyledTextLink>{children}</StyledTextLink>
    </Link>
  );
};

export const ExternalLink = styled(StyledLink).attrs({
  target: "_blank",
})``;

const SocialLinkWrapper = styled.a`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg100};
  transition: 0.4s all ease-in-out;
  :hover {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.bg200};
  }
`;

interface SocialIconProps {
  text: string;
  href: string;
  nature: "facebook" | "twitter" | "discord" | "telegram" | "instagram";
}

const renderIcon = (nature: string) => {
  switch (nature) {
    case "facebook":
      return <FaceBookFIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "discord":
      return <DiscordIcon />;
    case "telegram":
      return <TelegramIcon />;

    default:
      return undefined;
  }
};

export const SocialLink = (props: SocialIconProps) => {
  const { href, nature, text } = props;

  return (
    <Tippy content={text} theme={nature}>
      <SocialLinkWrapper href={href} target="_blank">
        {renderIcon(nature)}
      </SocialLinkWrapper>
    </Tippy>
  );
};
