import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  outline: 0rem;
  padding: 0rem;
  margin: 0rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg300};
`;

export const StyledTextArea = styled.textarea`
  min-height: 7rem;
  min-width: 100%;
  max-width: 100%;
  outline: 0rem;
  padding: 1rem;
  margin: 0rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg300};
`;

export const StyledCheckbox = styled.input.attrs<HTMLInputElement>({
  type: "checkbox",
})`
  min-width: 3rem;
  width: 3rem;
  height: 1.5rem;
  border-radius: 6.25rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg100};
  appearance: none;
  transition: background-color 0.5s ease-in-out;
  margin: 0rem;
  outline: none;
  padding: 0rem 0.25rem;
  cursor: pointer;
  ::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    transition: transform 0.5s ease-in-out;
    background-color: ${({ theme }) => theme.primary100};
  }
  :checked {
    background-color: ${({ theme }) => theme.primary100};
    ::after {
      transform: translateX(1.5rem);
      background-color: ${({ theme }) => theme.bg100};
    }
  }
`;
