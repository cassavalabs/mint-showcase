import Image, { ImageProps } from "next/image";
import styled from "styled-components";
import { IconButton } from "../button";
import { FullWidth, FlexCenter } from "../styles";
import { EditPencilIcon } from "../icons";

export const ContainerOverlay = styled(FullWidth)`
  position: absolute;
  height: 99%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out 0s;
  z-index: 1;
`;

export const ImageEditButton = styled(IconButton)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text300};
  padding: 0rem;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
`;

export const ImageBorder = styled(FlexCenter)<
  Pick<RoundAvatarProps, "size" | "editable" | "mt">
>`
  position: relative;
  width: ${({ size }) => size + "rem"};
  height: ${({ size }) => size + "rem"};
  border: 0.2rem solid ${({ theme }) => theme.bg100};
  border-radius: 100%;
  margin-top: ${({ mt }) => mt ?? null};
  cursor: ${({ editable }) => (editable ? "pointer" : "default")};
  overflow: hidden;
  z-index: 5;
  &:hover > ${ContainerOverlay} {
    opacity: ${({ editable }) => (editable ? "1" : null)};
  }

  &:hover > ${ImageEditButton} {
    opacity: ${({ editable }) => (editable ? "1" : null)};
    z-index: ${({ editable }) => (editable ? "2" : null)};
  }
`;

export const CoverImage = styled(Image)`
  border-radius: 50%;
`;

interface RoundAvatarProps extends ImageProps {
  size: number;
  mt?: string;
  editable?: boolean;
  onClick?: () => void;
}

export const RoundAvatar = (props: RoundAvatarProps) => {
  const { size, mt, editable, onClick, ...rest } = props;

  return (
    <ImageBorder size={size} mt={mt} editable={editable}>
      <ContainerOverlay />
      <CoverImage {...rest} />
      <ImageEditButton onClick={onClick}>
        <EditPencilIcon />
      </ImageEditButton>
    </ImageBorder>
  );
};
