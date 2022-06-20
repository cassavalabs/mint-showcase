import { NextApiHandler } from "next";
import { withSessionRoute } from "@cassavaland/sdk";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  req.session.destroy();

  res.status(200).send({ ok: true });
};

export default withSessionRoute(handler);
