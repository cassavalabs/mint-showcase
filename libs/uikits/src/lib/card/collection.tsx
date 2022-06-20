import styled from "styled-components";
import { rgba } from "polished";
import Image from "next/image";
import Link from "next/link";
import { CollectionCardProps, walletNameId } from "@cassavaland/sdk";
import { FlexColumn, FlexCenter } from "../styles";
import { RoundAvatar } from "../avatar";
import { GradientAvatar } from "../identicon";
import { Text } from "../text";

const Card = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.bg200};
  cursor: pointer;
  overflow: hidden;
`;

const CardHeader = styled(FlexCenter)`
  width: 100%;
  min-height: 13rem;
  height: 13rem;
  position: relative;
  background-color: ${({ theme }) => theme.bg300};
`;

const PushUp = styled.div`
  margin-top: -2rem;
`;

const GroupTitle = styled(FlexCenter)`
  margin-top: 0.5rem;
`;

const ProfileLink = styled.a`
  font-weight: 600;
  color: ${({ theme }) => theme.primary100};
  max-width: 10rem;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease-in-out;
  :hover {
    color: ${({ theme }) => rgba(theme.primary100, 0.7)};
  }
`;

const Title = styled(Text)`
  max-width: 13.75rem;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
`;

const Description = styled(Title)`
  max-width: 100%;
  height: 4.375rem;
  font-weight: normal;
  color: ${({ theme }) => theme.text200};
  padding-right: 10%;
  padding-left: 10%;
  margin: 1rem auto 1.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const CollectionCard = (props: CollectionCardProps) => {
  const {
    owner,
    slug,
    address: collection_address,
    banner_image_uri,
    blockchain,
  } = props;

  return (
    <Link
      href={`/collection/${blockchain}/${slug ? slug : collection_address}`}
    >
      <Card>
        <CardHeader>
          {banner_image_uri && (
            <Image
              src={banner_image_uri}
              layout="fill"
              objectFit="cover"
              alt={props.name}
            />
          )}
        </CardHeader>
        <PushUp>
          {owner.avatar_uri ? (
            <RoundAvatar
              size={4}
              src={owner.avatar_uri}
              width={64}
              height={64}
              alt={owner.display_name}
            />
          ) : (
            <GradientAvatar size={64} seed={collection_address} />
          )}
        </PushUp>
        <GroupTitle>
          <Title>{props.name}</Title>
        </GroupTitle>
        <FlexCenter>
          <Text size={0.875}>
            By{" "}
            <Link
              href={`/${owner.username ? owner.username : owner.address}`}
              passHref
            >
              <ProfileLink>
                {owner.username ? owner.username : walletNameId(owner.address)}
              </ProfileLink>
            </Link>
          </Text>
        </FlexCenter>
        <Description>
          <span>{props.description}</span>
        </Description>
      </Card>
    </Link>
  );
};
