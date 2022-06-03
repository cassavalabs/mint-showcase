import { NextApiHandler } from "next";
import { v4 as uuidV4 } from "uuid";
import { withSessionRoute } from "@cassavaland/sdk";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  req.session.nonce = uuidV4();
  await req.session.save();

  res.status(200).send({ nonce: req.session.nonce });
};

export default withSessionRoute(handler);
