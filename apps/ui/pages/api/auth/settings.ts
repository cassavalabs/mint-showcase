import { NextApiHandler } from "next";
import { isAddress, withSessionRoute, filterOutNull } from "@cassavaland/sdk";
import { AccountModel } from "../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const userWallet = req.session.account;

  if (!userWallet || !isAddress(userWallet)) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  try {
    const payload = filterOutNull(body);
    const accountModel = await AccountModel();
    await accountModel.findOneAndUpdate(
      { address: userWallet.toLowerCase() },
      {
        ...payload, //TODO:filter what can be updated
      }
    );

    res.status(200).send({ ok: true, payload });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, error });
  }
};

export default withSessionRoute(handler);
