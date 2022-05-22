import { ReactNode } from "react";
import styled from "styled-components";
import { ToggleBtn } from "../button";
import { Text } from "../text";
import media from "../theme/media";

export const FullWidth = styled.div`
  width: 100%;
`;

export const Flex = styled.div<{ full?: boolean }>`
  width: ${({ full }) => (full ? "100%" : null)};
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = styled(FlexBetween)`
  justify-content: center;
`;

export const FlexStart = styled(FlexBetween)`
  justify-content: flex-start;
`;

export const FlexColumnStart = styled(FlexStart)`
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexColumnCenter = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexEnd = styled(FlexStart)`
  justify-content: flex-end;
`;

export const LeftIcon = styled(Flex)<{ size?: number; rounded?: boolean }>`
  width: ${({ size }) => (size ? size + "rem" : "2rem")};
  min-width: ${({ size }) => (size ? size + "rem" : "2rem")};
  height: ${({ size }) => (size ? size + "rem" : "2rem")};
  min-height: ${({ size }) => (size ? size + "rem" : "2rem")};
  margin-right: ${({ size }) => (size ? size / 2 + "rem" : "1rem")};
  background-color: ${({ theme, rounded }) => (rounded ? theme.bg300 : null)};
  border-radius: ${({ rounded }) => (rounded ? "100%" : null)};
  overflow: ${({ rounded }) => (rounded ? "hidden" : null)};
  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;

export const RightIcon = styled(LeftIcon)`
  margin: 0rem 0rem 0rem auto;
`;

export const SidebarMenu = styled.div<{ isOpen?: boolean }>`
  width: 26rem;
  height: calc(100% - 4.5rem);
  display: flex;
  position: fixed;
  bottom: 0rem;
  right: 0rem;
  overflow-y: auto;
  overflow-x: hidden;
  transform: ${({ isOpen }) =>
    isOpen ? "translate3d(0rem, 0rem, 0rem)" : "translate3d(100%, 0rem, 0rem)"};
  transition: transform 0.3s ease-in-out;
  border: 0.1rem solid ${({ theme }) => theme.bg300};
  background-color: ${({ theme }) => theme.bg200};
  border-radius: 0rem;
  z-index: 200;

  ${media.mobileL`
    width: 100%;
  `}
`;

export const MenuContainer = styled(FullWidth)<{ show?: boolean }>`
  min-width: ${({ show }) => (show ? "100%" : "0rem")};
  /* max-width: 35.9375rem; */
  /* height: calc(100vh - 6.75rem); */
  overflow: hidden;
  transform: ${({ show }) =>
    show ? "translate3d(0rem, 0rem, 0rem)" : "translate3d(100%, 0rem, 0rem)"};
  transition: transform 0.3s ease-in-out;
  /* :hover {
    overflow-y: auto;
  } */
`;

interface ToggleSubMenuProps {
  title: ReactNode;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  size?: number;
  onClick?: () => void;
}
export const ToggleButton = (props: ToggleSubMenuProps) => {
  const { rightIcon, leftIcon, title, size, onClick } = props;

  return (
    <ToggleBtn onClick={onClick}>
      <FlexStart>
        <LeftIcon size={size}>{leftIcon}</LeftIcon>
        <Flex>{title}</Flex>
      </FlexStart>
      {rightIcon}
    </ToggleBtn>
  );
};

export const Overlay = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
  z-index: ${({ show }) => (show ? 50 : -1)};
`;

export const FormGroup = styled(FlexColumn)`
  width: 100%;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const FormLabel = styled(Text)`
  color: ${({ theme }) => theme.text300};
  font-weight: 600;
  text-align: start;
  margin-bottom: 0.5rem;
`;

export const Page = styled(FlexColumn)<{ centered?: boolean }>`
  align-items: ${({ centered }) => (centered ? "center" : null)};
`;

export const BoxedPage = styled(Page)`
  width: 100%;
  max-width: 48rem;
  padding: 2rem 1rem;
`;

export const Container = styled(FullWidth)`
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
  min-height: 0.0625rem;

  ${media.atLeastMobileL`
    max-width: 540px;
  `};
  ${media.atLeastTablet`
    max-width: 720px;
  `};
  ${media.atLeastTabletL`
    max-width: 960px;
  `};
  ${media.atLeastLaptopM`
    max-width: 1140px;
  `};
  ${media.atLeastLaptopL`
    max-width: 1320px;
  `}
`;

export const HorizontalDivider = styled(Container)`
  background-color: ${({ theme }) => theme.secondary100};
`;
