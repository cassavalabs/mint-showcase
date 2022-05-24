import styled from "styled-components";
import type { ReactNode } from "react";
import {
  BaseButton,
  FlexColumn,
  FlexCenter,
  StyledInput,
  Text,
  CheckIcon,
  PrimaryButton,
  RightIcon,
} from "@cassavaland/uikits";

export const Form = styled(FlexColumn)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0rem;
`;

export const Textbox = styled(StyledInput)`
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

export const SelectButton = styled(BaseButton)`
  position: relative;
  width: 100%;
  height: 3rem;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  background-color: transparent;
  color: ${({ theme }) => theme.text200};
  margin: 0rem;
  border-radius: 0.5rem;
  justify-content: flex-start;
  :hover {
    box-shadow: ${({ theme }) => theme.bg700} 0rem 0rem 0rem 0.1rem;
  }
  &.active {
    box-shadow: ${({ theme }) => theme.primary100} 0rem 0rem 0rem 0.1rem;
  }
`;

const ActiveBadge = styled(FlexCenter)`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  color: white;
  border: 1px solid ${({ theme }) => theme.text300};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary100};
`;

export const SquaredBtn = styled(BaseButton)`
  position: relative;
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  background-color: transparent;
  color: ${({ theme }) => theme.text200};
  width: 9.5rem;
  height: 9rem;
  border-radius: 0.5rem;
  margin: 0.5rem 1rem 0.5rem 0rem;
  flex-direction: column;
  :hover {
    box-shadow: ${({ theme }) => theme.bg700} 0rem 0rem 0rem 0.1rem;
  }
  &.active {
    box-shadow: ${({ theme }) => theme.primary100} 0rem 0rem 0rem 0.1rem;
  }
`;

export const SquaredButton = ({
  active,
  children,
  label,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  label: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <SquaredBtn className={active ? "active" : ""} onClick={onClick}>
      {active && (
        <ActiveBadge>
          <CheckIcon />
        </ActiveBadge>
      )}
      {children}
      <Text weight={600} color="text300" margin="0.5rem 0rem 0rem 0rem">
        {label}
      </Text>
    </SquaredBtn>
  );
};

export const SubmitButton = styled(PrimaryButton)`
  border-radius: 0.5rem;
  font-weight: 600;
`;

export const Icon = styled(RightIcon)`
  margin: 0rem;
`;
