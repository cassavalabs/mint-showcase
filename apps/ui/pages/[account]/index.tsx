import { Grid } from "@cassavaland/uikits";
import { FAKE_DATA, getNftCardWidth, withSessionSsr } from "@cassavaland/sdk";
import Layout from "../../components/Layouts/Profile";
import { fetchAccount } from "../../libs/fetch-account";

export default function Collected({ user }) {
  console.log("AM User " + JSON.stringify(user));
  return (
    <Layout account={user}>
      <Grid
        dataz={FAKE_DATA}
        getCardWidth={getNftCardWidth}
        cardHeight={360}
        type="nft"
      />
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const userWallet = req.session.account;
    const username = params.account as string;

    if (!userWallet && username === "account") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const userAccount = await fetchAccount(userWallet, username);

    if (!userAccount) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: userAccount,
      },
    };
  }
);
