import styled from "styled-components";

/* eslint-disable-next-line */
export interface UikitsProps {}

const StyledUikits = styled.div`
  color: pink;
`;

export function Uikits(props: UikitsProps) {
  return (
    <StyledUikits>
      <h1>Welcome to Uikits!</h1>
    </StyledUikits>
  );
}

export default Uikits;
