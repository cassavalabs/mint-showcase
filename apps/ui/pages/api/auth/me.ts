import { NextApiHandler } from "next";
import { isAddress, withSessionRoute } from "@cassavaland/sdk";
import { AccountModel } from "../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const userWallet = req.session.account;

  if (!userWallet || !isAddress(userWallet)) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const accountModel = await AccountModel();
  let account = await accountModel.findOne({ address: userWallet }).exec();

  if (!account) {
    account = await new accountModel({
      address: userWallet,
      verified: false,
    }).save();
  }

  res.status(200).send(account);
};

export default withSessionRoute(handler);
