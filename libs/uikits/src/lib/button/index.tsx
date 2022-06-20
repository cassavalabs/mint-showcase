import styled from "styled-components";
import { darken, lighten } from "polished";
import media from "../theme/media";

export interface BaseButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  opacity?: string;
}

export const BaseButton = styled.button.attrs<BaseButtonProps>(({ type }) => ({
  type: type ?? "button",
}))<BaseButtonProps>`
  width: auto;
  height: auto;
  padding: 0.625rem 1rem;
  margin: 0rem;
  background-color: transparent;
  border-width: 0.1rem;
  border-style: solid;
  border-color: transparent;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-align: center;
  line-height: 1;
  color: #fff;
  text-transform: none;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  opacity: ${({ disabled, opacity }) =>
    disabled ? 0.5 : opacity ? opacity : 1};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: 0px;
  }
`;

export const ConnectWallet = styled(BaseButton)`
  background-color: ${({ theme }) => theme.bg400};
  padding: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
  transition: all 0.5s ease;
  border-radius: 12px;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.bg400)};
  }
`;

export const MenuButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.bg100};
  padding: 0rem 0.5rem;
  height: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text200};
  transition: all 0.5s ease;
  border-radius: 0rem;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.bg200)};
  }
`;

export const PrimaryButton = styled(BaseButton)`
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.bg500};
  padding: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
  transition: all 0.5s ease;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.bg500)};
  }
`;

export const ToggleBtn = styled(BaseButton)`
  width: 100%;
  height: 100%;
  line-height: 1;
  padding: 1rem;
  flex: 1;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) => theme.text200};
  &:hover {
    color: ${({ theme }) => theme.text300};
    background-color: ${({ theme }) => theme.bg100};
  }
`;

export const IconButton = styled(BaseButton)`
  background-color: transparent;
  border: 0rem;
  color: ${({ theme }) => theme.text200};
  transition: all 0.5s ease;
  border-radius: 0rem;
  &:hover {
    color: ${({ theme }) => theme.text300};
  }
`;

export const EditBannerButton = styled(BaseButton)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white};
  padding: 0.3rem 0.75rem;
  margin: 0rem 2rem 1rem 0rem;
  border-radius: 0.5rem;
  span {
    font-weight: normal;
    padding-left: 0.5rem;
    font-size: 1rem;
    ${media.tablet`
      display: none;
    `}
  }
  :hover {
    background-color: ${darken(0.2, "#ffffff")};
  }
`;

export const EditProfileButton = styled(EditBannerButton)`
  background-color: #2172e5;
  color: ${({ theme }) => theme.white};
  font-weight: normal;
  font-size: 1rem;
  margin: 0rem;
  svg {
    margin-right: 0.5rem;
  }
  :hover {
    background-color: ${darken(0.2, "#2172e5")};
  }
`;

export const FollowButton = styled(EditProfileButton)`
  margin-right: 0.5rem;
`;

export const ShareProfileButton = styled(EditProfileButton)`
  background-color: #191b1f;
  margin-right: 0.5rem;
  border: 1px solid ${({ theme }) => theme.secondary100};
  :hover {
    background-color: ${darken(0.2, "#191B1F")};
  }
`;

export const ProfileWalletAddressButton = styled(IconButton)`
  width: fit-content;
  padding: 0.125rem 0.75rem 0.125rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  margin: 0.5rem auto 1.5rem;
  background-color: ${({ theme }) => theme.bg100};
  border-radius: 0.5rem;
  img,
  svg {
    width: 1rem;
    height: auto;
    margin-right: 0.3125rem;
  }
  span {
    flex-grow: 1;
  }
`;

export const FloatingFilterButton = styled(BaseButton)`
  min-width: 3.25rem;
  width: 3.25rem;
  height: 3.25rem;
  padding: 0rem;
  border-radius: 100%;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary100};
  box-shadow: 0.125rem 0.125rem 0.5rem ${({ theme }) => theme.secondary100};
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  font-size: 2rem;
`;

export const PrimaryOutline = styled(PrimaryButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary100};
  border-color: ${({ theme }) => theme.primary100};
  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.primary100)};
    color: ${({ theme }) => theme.white};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  position: relative;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  background-color: transparent;
  color: ${({ theme }) => theme.text200};
  margin: 0.25rem;
  border-radius: 0.5rem;
  justify-content: flex-start;
  :hover {
    background-color: ${({ theme }) => theme.bg700};
  }

  :disabled:hover {
    background-color: none;
  }

  &.active {
    box-shadow: ${({ theme }) => theme.primary100} 0rem 0rem 0rem 0.1rem;
  }
  :last-child {
    margin-bottom: 5rem;
  }
`;

export const SecondaryOutlineBtn = styled(BaseButton)`
  position: relative;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  background-color: transparent;
  color: ${({ theme }) => theme.text200};
  border-radius: 0.5rem;
  :hover {
    background-color: ${({ theme }) => theme.bg700};
  }
`;
