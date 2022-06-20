import styled from "styled-components";
import Image from "next/image";
import ColorHash from "color-hash";
import { FlexCenter } from "../styles";
import { VerifiedBadge } from "../icons";

const IdenticonWrapper = styled(FlexCenter)<{ size?: number }>`
  position: relative;
  width: ${({ size }) => (size ? size + "rem" : "2rem")};
  height: ${({ size }) => (size ? size + "rem" : "2rem")};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.bg100};
  z-index: 2;
`;

const IdenticonImage = styled(FlexCenter)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  border-radius: 100%;
  overflow: hidden;
`;

const Badge = styled.div`
  color: ${({ theme }) => theme.primary100};
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  bottom: 0rem;
  right: -0.5rem;
  z-index: 2;
  svg {
    width: 100%;
    height: 100%;
  }
`;

interface IdenticonProps {
  size?: number;
  image: string;
  verified?: boolean;
}

export const Identicon = (props: IdenticonProps) => {
  const { image, size, verified } = props;

  return (
    <IdenticonWrapper size={size}>
      <IdenticonImage>
        <Image src={image} layout="fill" alt="identicon" />
      </IdenticonImage>
      {verified && (
        <Badge>
          <VerifiedBadge />
        </Badge>
      )}
    </IdenticonWrapper>
  );
};

const colorHash = new ColorHash({ saturation: 1 });

export const GradientAvatar = ({
  seed,
  size,
}: {
  seed: string;
  size: number;
}) => {
  // seed = seed.toString().toLowerCase();
  const c1 = colorHash.hex(seed.substring(0, seed.length / 2));
  const c2 = colorHash.hex(seed.substring(seed.length / 2));

  const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${
    size / 2
  }" fill="url(#gradient)" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
        <stop stop-color="${c1}" />
        <stop offset="1" stop-color="${c2}" />
      </linearGradient>
    </defs>
  </svg>`;

  return (
    <IdenticonWrapper size={size / 16}>
      <IdenticonImage>
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
          layout="fill"
          objectFit="cover"
          alt="Identicon"
        />
      </IdenticonImage>
    </IdenticonWrapper>
  );
};
