import styled from "styled-components";
import { memo } from "react";
import { areEqual, GridChildComponentProps } from "react-window";
import { CollectionCard, NFTCard } from "../card";

const GridCellWrapper = styled.div``;

const NftGridCell = memo(
  ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
    const { dataz, columnCount } = data;
    const itemColumnIndex = columnIndex + rowIndex * columnCount;
    const cellData = dataz[itemColumnIndex];

    return (
      <GridCellWrapper style={{ padding: "0.75rem 0.5rem", ...style }}>
        {cellData && <NFTCard {...cellData} />}
      </GridCellWrapper>
    );
  },
  areEqual
);

const CollectionGridCell = memo(
  ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
    const { dataz, columnCount } = data;
    const itemColumnIndex = columnIndex + rowIndex * columnCount;
    const cellData = dataz[itemColumnIndex];

    return (
      <GridCellWrapper style={{ padding: "1.5rem 1rem", ...style }}>
        {cellData && <CollectionCard {...cellData} />}
      </GridCellWrapper>
    );
  },
  areEqual
);

CollectionGridCell.displayName = "CollectionGridCell";
NftGridCell.displayName = "NftGridCell";

export { CollectionGridCell, NftGridCell };
