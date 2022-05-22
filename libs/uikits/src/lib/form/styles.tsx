import styled from "styled-components";
import { BaseButton } from "../button";
import { StyledInput } from "../input";
import { FlexColumnCenter, FlexCenter } from "../styles";
import media from "../theme/media";

interface FileContainerProps {
  width?: string;
  height?: string;
}

export const FileContainer = styled(FlexColumnCenter)<FileContainerProps>`
  width: ${({ width }) => width ?? "22rem"};
  height: ${({ height }) => height ?? "16rem"};
  border: 0.125rem dashed ${({ theme }) => theme.text200};
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: ${({ theme }) => theme.primary100};
  }
`;

export const FileInput = styled.input`
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
`;

export const OutlineButton = styled(BaseButton)`
  position: relative;
  min-width: 9rem;
  border: 1px solid ${({ theme }) => theme.bg600};
  background-color: transparent;
  color: ${({ theme }) => theme.text200};
  margin: 0.5rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  :hover {
    box-shadow: ${({ theme }) => theme.bg700} 0rem 0rem 0rem 0.1rem;
  }
  &.active {
    box-shadow: ${({ theme }) => theme.primary100} 0rem 0rem 0rem 0.1rem;
  }
  :first-child {
    margin-left: 0rem;
  }
  ${media.mobileL`
:nth-child(2) {
  margin-left: auto;
  margin-right: 0rem;
}
:nth-child(3) {
  margin-left: 0rem;
}
`};
`;

export const CloseButton = styled(OutlineButton)`
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
  font-size: 2rem;
  min-width: auto;
  padding: 0rem;
  z-index: 20;
  &:hover {
    box-shadow: none;
    & + #preview {
      opacity: 0.4;
    }
  }
`;

export const FilePreview = styled(FlexCenter)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  &:hover {
    opacity: 0.4;
  }
`;

export const StyledTextbox = styled(StyledInput)`
  height: 3rem;
  padding: 1rem;
  border-radius: 0.5rem;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [type="number"] {
    -moz-appearance: textfield;
  }
`;
