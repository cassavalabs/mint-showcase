import styled from "styled-components";
import type { ReactElement } from "react";
import dynamic from "next/dynamic";
import { FullWidth } from "@cassavaland/uikits";
import { Header } from "../Headers/Home";

const Sidebar = dynamic(() => import("../Sidebar"), { ssr: false });

const Container = styled(FullWidth)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled(FullWidth)`
  min-height: 100%;
  flex: 1 0 auto;
`;

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <Container>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Sidebar />
    </Container>
  );
}
