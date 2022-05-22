import type { ReactElement } from "react";
import styled from "styled-components";
import { Page } from "@cassavaland/uikits";
import { ProfileHeader } from "../Headers/Profile";

const PageContent = styled(Page)`
  position: relative;
  padding: 2rem 1rem 1rem 1rem;
  background-color: ${({ theme }) => theme.bg100};
`;

export default function ProfileLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <Page>
      <ProfileHeader />
      <PageContent>{children}</PageContent>
    </Page>
  );
}
