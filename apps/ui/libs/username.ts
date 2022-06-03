import { AssetCollectionModel, AccountModel } from "../models";

interface Response {
  valid: boolean;
  reason?: string;
}
export async function isValidAccountUsername(
  username: string
): Promise<Response> {
  if (!username || username.length < 4) {
    return {
      valid: false,
      reason: "Username must contain atleast 4 alphanumeric characters",
    };
  }

  if (!username.match(/^[a-zA-Z0-9]+$/i)) {
    return {
      valid: false,
      reason: "Username must not contain space or any special characters",
    };
  }

  const accountModel = await AccountModel();
  if (accountModel.exists({ username: username.toLowerCase() })) {
    return {
      valid: false,
      reason: "Username already exists",
    };
  }

  return {
    valid: true,
  };
}

export async function isValidCollectionURL(
  username: string
): Promise<Response> {
  if (!username || username.length < 4) {
    return {
      valid: false,
      reason:
        "Collection username must contain atleast 4 alphanumeric characters",
    };
  }

  if (!username.match(/^[a-zA-Z0-9]+$/i)) {
    return {
      valid: false,
      reason:
        "Collection username must not contain space or any special characters",
    };
  }

  const collectionModel = await AssetCollectionModel();
  if (collectionModel.exists({ slug: username.toLowerCase() })) {
    return {
      valid: false,
      reason: "Collection username already exists",
    };
  }

  return {
    valid: true,
  };
}
