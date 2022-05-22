import "dotenv/config";

export function getRPC(networkName: string): string {
  if (networkName) {
    const uri = process.env[networkName.toUpperCase() + "_RPC_URL"];
    if (uri && uri !== "") {
      return uri;
    }
  }
  return "http://localhost:8545";
}

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    const mnemonic = process.env[networkName.toUpperCase() + "_MNEMONIC"];
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk";
  }
  return mnemonic;
}

export function getPrivateKey(networkName?: string) {
  if (networkName) {
    const privateKey = process.env[networkName.toUpperCase() + "_PRIVATE_KEY"];
    if (privateKey && privateKey !== "") {
      return [privateKey];
    }
  }

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey === "") {
    return [];
  }
  return [privateKey];
}

export function accounts(networkName?: string) {
  return {
    mnemonic: getMnemonic(networkName),
    path: "m/44'/60'/0'/0",
    initialIndex: 0,
  };
}
