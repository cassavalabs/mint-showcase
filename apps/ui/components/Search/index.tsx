import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  FullWidth,
  // CloseIcon,
  // IconButton,
  StyledInput,
  SearchIcon,
  media,
} from "@cassavaland/uikits";
// import { useDebounce } from "../../hooks/useDebounce";

const Container = styled(FullWidth)`
  position: relative;
  max-width: 64rem;
  height: 100%;

  ${media.atLeastLaptop`
    /* max-width: 26.87rem; */
    margin-left: auto;
  `}
`;

const InputContainer = styled(Container)<{ full?: boolean }>`
  height: ${({ full }) => (full ? "100%" : "2.8125rem")};
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bg200};
  border-radius: ${({ full }) => (full ? "0rem" : "0.5rem")};
  background-color: ${({ theme }) => theme.bg300};
`;

const Icon = styled.div<{ full?: boolean }>`
  margin: ${({ full }) => (full ? "0rem 0.75rem 0rem 1rem" : "0rem 0.75rem")};
  display: flex;
  align-items: center;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

// const IconBtn = styled(IconButton)`
//   padding: 0rem;
//   color: ${({ theme }) => theme.text200};
//   svg {
//     width: 1.25rem;
//     height: 1.25rem;
//   }
// `;

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  full?: boolean;
}

export const Search = (props: SearchProps) => {
  const { full, ...rest } = props;

  return (
    <Container>
      <InputContainer full={full}>
        <Icon full={full}>
          <SearchIcon />
        </Icon>
        <StyledInput {...rest} />
      </InputContainer>
    </Container>
  );
};
