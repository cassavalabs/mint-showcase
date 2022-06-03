// import type { Account } from "@cassavaland/sdk";
import { AccountModel } from "../models";

export const fetchAccount = async (userWallet: string, username: string) => {
  const accountModel = await AccountModel();
  let account: any;

  if (username === "account") {
    account = await accountModel
      .findOne({ address: userWallet.toLowerCase() })
      .lean();

    if (!account) {
      account = await new accountModel({
        address: userWallet.toLowerCase(),
        verified: false,
      }).save();
    }
  } else {
    account = await accountModel
      .findOne({ username: username.toLowerCase() })
      .lean();
  }

  if (account) {
    const { __v, _id, created_at, updated_at, ...rest } = account;

    return {
      ...rest,
    };
  }

  return null;
};
