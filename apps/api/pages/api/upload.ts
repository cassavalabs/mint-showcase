import { NextApiHandler } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-west-2",
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
  signatureVersion: "v4",
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Unsupported method" });
  }

  try {
    const { filename, type } = req.body;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", params);
    res.status(200).send(url);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};
