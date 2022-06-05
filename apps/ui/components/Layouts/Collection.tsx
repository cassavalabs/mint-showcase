import styled from "styled-components";
import type { ReactElement } from "react";
import { FlexColumn } from "@cassavaland/uikits";
import { CollectionCardProps } from "@cassavaland/sdk";
import { CollectionHeader } from "../Headers/Collection";

const PageContent = styled(FlexColumn)`
  position: relative;
  background-color: ${({ theme }) => theme.bg100};
  padding: 2rem 1rem 1rem 1rem;
`;

export default function Collection({
  children,
  collection,
}: {
  children: ReactElement;
  collection: CollectionCardProps;
}) {
  return (
    <FlexColumn>
      <CollectionHeader collection={collection} />
      <PageContent>{children}</PageContent>
    </FlexColumn>
  );
}
