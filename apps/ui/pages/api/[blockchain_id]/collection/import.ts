import { NextApiHandler } from "next";
import {
  getContractDeployer,
  getUserNftContract,
  AssetCollection,
  withSessionRoute,
  slugify,
} from "@cassavaland/sdk";
import { AssetCollectionModel, AccountModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  const payload: { address: string; description?: string } = req.body;
  let assetCollection: AssetCollection;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  try {
    const chainId = req.query.blockchain_id as string;

    const contractDeployer = await getContractDeployer(
      parseInt(chainId),
      payload.address
    );

    if (contractDeployer) {
      const contract = await getUserNftContract(
        parseInt(chainId),
        contractDeployer.address
      );

      if (contract && contract.address) {
        const accountModel = await AccountModel();
        let account = await accountModel
          .findOne({ address: contractDeployer.deployer.toLowerCase() })
          .exec();

        if (!account) {
          account = await new accountModel({
            address: contractDeployer.deployer.toLowerCase(),
            verified: false,
          }).save();
        }

        const assetCollectionModel = await AssetCollectionModel();
        assetCollection = await assetCollectionModel.findOneAndUpdate(
          {
            blockchain: chainId,
            address: payload.address.toLowerCase(),
            owner: account._id,
          },
          {
            ...contract,
            slug: slugify(contract.name ?? contract.address),
            description: payload.description,
          },
          { upsert: true, new: true }
        );
      } else {
        return res.status(404).send({ error: "Could not find contract" });
      }
    } else {
      return res.status(404).send({ error: "Could not find contract" });
    }

    return res.status(200).send({
      ok: true,
      contract: {
        address: assetCollection.address,
        name: assetCollection.name,
        standard: assetCollection.contract_standard,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({ ok: false });
  }
};

export default withSessionRoute(handler);
