import styled from "styled-components";
import Image, { ImageProps } from "next/image";

const CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/";

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
`;

interface FlagProps extends Omit<ImageProps, "src"> {
  countryCode: string;
}

export const Flag = (props: FlagProps) => {
  const { countryCode, ...rest } = props;

  return (
    <StyledImage
      width={32}
      height={32}
      {...rest}
      src={`${CDN + countryCode.toLowerCase()}.svg`}
      unoptimized={true}
    />
  );
};
