import { useCallback } from "react";
// import styled from "styled-components";
import {
  FlexColumnCenter,
  LinkIcon,
  StyledIconBtn,
  Text,
} from "@cassavaland/uikits";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export const ShareLink = ({
  toCopy,
  size,
}: {
  toCopy: string;
  size?: number;
}) => {
  const [isCopied, setCopied] = useCopyToClipboard();

  const copy = useCallback(() => {
    setCopied(toCopy);
  }, [toCopy, setCopied]);

  return (
    <FlexColumnCenter>
      <StyledIconBtn onClick={copy} size={size}>
        <LinkIcon />
      </StyledIconBtn>
      <Text size={0.75}>{isCopied ? "Copied" : "Copy"}</Text>
    </FlexColumnCenter>
  );
};
