import styled from "styled-components";
import Image from "next/image";
import { Container } from "../styles";
import { ImageEditButton, ContainerOverlay } from "../avatar";
import { EditPencilIcon } from "../icons";
import media from "../theme/media";

const Wrapper = styled(Container)`
  padding: 0rem;
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  align-items: stretch;
  position: relative;
  min-height: 12rem;
  max-height: 16.25rem;

  ${media.atLeastTabletL`
    height: 19.5rem;
  `}
`;

const BannerPlaceholder = styled(Wrapper)<Pick<BannerProps, "editable">>`
  position: relative;
  background-color: ${({ theme }) => theme.bg100};
  border-radius: 0rem 0rem 1rem 1rem;
  max-height: 21rem;
  overflow: hidden;
  cursor: ${({ editable }) => (editable ? "pointer" : "default")};
  &:hover > ${ContainerOverlay} {
    opacity: ${({ editable }) => (editable ? "1" : null)};
  }

  &:hover > ${ImageEditButton} {
    opacity: ${({ editable }) => (editable ? "1" : null)};
    z-index: ${({ editable }) => (editable ? "2" : null)};
  }
`;

interface BannerProps {
  image?: string;
  editable?: boolean;
  onClick?: () => void;
}

export const Banner = (props: BannerProps) => {
  const { image, editable, onClick } = props;

  return (
    <Wrapper>
      <BannerPlaceholder editable={editable}>
        <ContainerOverlay />
        {image && (
          <Image src={image} layout="fill" alt="banner" objectFit="cover" />
        )}
        <ImageEditButton onClick={onClick}>
          <EditPencilIcon />
        </ImageEditButton>
      </BannerPlaceholder>
    </Wrapper>
  );
};
