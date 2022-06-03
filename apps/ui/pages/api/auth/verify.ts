import { NextApiHandler } from "next";
import { Web3Auth, withSessionRoute } from "@cassavaland/sdk";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const { message, signature }: { message: string; signature: string } =
    req.body;

  try {
    const signerAddress = Web3Auth.verify(message, signature);

    const { account, nonce } = Web3Auth.parseMessage(message);

    if (nonce !== req.session.nonce) {
      return res
        .status(422)
        .send({ error: "Invalid or expired nonce provided" });
    }

    if (signerAddress.toLowerCase() !== account.toLowerCase()) {
      return res
        .status(422)
        .send({ error: "Connected account do not match signature" });
    }

    req.session.account = signerAddress;
    await req.session.save();

    return res.status(200).send({ verified: true });
  } catch (error) {
    console.log(error);
    res.send({ verified: false });
  }
};

export default withSessionRoute(handler);
