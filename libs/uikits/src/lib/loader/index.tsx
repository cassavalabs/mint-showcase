import styled, { keyframes } from "styled-components";
import { rgba } from "polished";

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  background: ${({ theme }) => rgba(theme.black, 0.45)};
  z-index: 1000;
`;

export const SpinLoading = styled.div<{ size?: number }>`
  width: ${({ size }) => (size ? size + "rem" : "2.5rem")};
  height: ${({ size }) => (size ? size + "rem" : "2.5rem")};
  position: relative;
  border: 0.2rem solid ${({ theme }) => theme.bg300};
  border-radius: 50%;
  border-top: 0.2rem solid ${({ theme }) => theme.bg500};
  animation: ${SpinAnimation} 0.8s linear infinite;
`;

export const SpinLoader = () => {
  return (
    <Container>
      <SpinLoading></SpinLoading>
    </Container>
  );
};
