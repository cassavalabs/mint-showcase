import styled from "styled-components";
import { FlexColumnCenter, Text, PrimaryButton } from "@cassavaland/uikits";

const HomeButton = styled(PrimaryButton)`
  width: 15rem;
  height: 4rem;
  font-size: 1.5rem;
  margin-top: 1rem;
`;

export default function NotFoundPage() {
  return (
    <FlexColumnCenter>
      <Text size={11} weight={700} color="text300" textAlign="center">
        404
      </Text>
      <Text size={1.5} color="text300" textAlign="center">
        Page Not Found
      </Text>
      <Text textAlign="center">
        Hey! its cold and lonely here, please take me home.
      </Text>
      <HomeButton as="a" href="/">
        Go back home
      </HomeButton>
    </FlexColumnCenter>
  );
}
