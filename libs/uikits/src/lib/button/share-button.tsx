import styled from "styled-components";
import { FlexColumn } from "../styles";
import { Text } from "../text";
import { FaceBookFIcon, EmailIcon, TelegramIcon, TwitterIcon } from "../icons";
import { IconButton } from ".";

const Container = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`;

export const StyledIconBtn = styled(IconButton)<{ size?: number }>`
  font-size: ${({ size }) => (size ? size / 2 + "rem" : "1.1rem")};
  width: ${({ size }) => (size ? size + "rem" : "2.5rem")};
  height: ${({ size }) => (size ? size + "rem" : "2.5rem")};
  border: 0.1rem solid ${({ theme }) => theme.bg600};
  border-radius: 50%;
  padding: 0rem;
`;

const Label = styled(Text)`
  font-size: 0.75rem;
  text-transform: capitalize;
`;

const renderIcon = (nature: string) => {
  switch (nature) {
    case "facebook":
      return <FaceBookFIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "email":
      return <EmailIcon />;
    case "telegram":
      return <TelegramIcon />;

    default:
      return undefined;
  }
};

interface ShareButtonProps {
  nature: string;
  url: string;
  size?: number;
  text?: string;
}

export const ShareButton = (props: ShareButtonProps) => {
  const { nature, url, text } = props;

  const handleClick = () => {
    switch (nature) {
      case "facebook": {
        return window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      }

      case "twitter": {
        return window.open(
          `https://twitter.com/share?url=${encodeURIComponent(url)}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      }

      case "telegram": {
        return window.open(`https://t.me/share/url?url=${url}&text=${text}`);
      }

      case "pinterest": {
        return window.open(
          `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      }

      case "email": {
        return window.open(`mailto:?body=${encodeURIComponent(url)}`, "_self");
      }

      default: {
        return;
      }
    }
  };

  return (
    <Container>
      <StyledIconBtn onClick={handleClick}>{renderIcon(nature)}</StyledIconBtn>
      <Label>{nature}</Label>
    </Container>
  );
};
