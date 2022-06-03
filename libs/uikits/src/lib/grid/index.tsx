import styled from "styled-components";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import memoize from "memoize-one";
import { CollectionGridCell, NftGridCell } from "./cell";
import { FullWidth } from "../styles";

const GridWrapper = styled(FullWidth)``;

interface GridProps {
  dataz: any[];
  getCardWidth: (width: number) => number;
  cardHeight: number;
  type: "nft" | "collection";
}

const memoizedData = memoize(({ columnCount, dataz }) => ({
  columnCount,
  dataz,
}));

export const Grid = ({ dataz, getCardWidth, cardHeight, type }: GridProps) => {
  return (
    <GridWrapper>
      <AutoSizer defaultWidth={1920} disableHeight>
        {({ width }) => {
          const height = window.innerHeight;
          const cardWidth = getCardWidth(width);
          const columnCount = Math.floor(width / cardWidth);
          const itemData = memoizedData({ columnCount, dataz });
          const GridCell =
            type === "collection" ? CollectionGridCell : NftGridCell;
          return (
            <FixedSizeGrid
              className="nft-grid"
              width={width}
              height={height}
              columnWidth={cardWidth}
              columnCount={columnCount}
              rowCount={Math.ceil(dataz.length / columnCount)}
              rowHeight={cardHeight}
              itemData={itemData}
              style={{ height: "100%" }}
            >
              {GridCell}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>
    </GridWrapper>
  );
};
