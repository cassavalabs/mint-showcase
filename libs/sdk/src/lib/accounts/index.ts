import { Signer, utils } from "ethers";
import { v4 as uuidV4 } from "uuid";

export class Web3Auth {
  nonce: string;
  message: string;
  account: string;

  constructor(
    props: Partial<{ nonce: string; message: string; account: string }>
  ) {
    this.nonce = `Nonce: ${props.nonce || uuidV4()}`;
    this.message = `Message: ${props.message}`;
    this.account = `Wallet Address: ${props.account}`;
  }

  formatMessage(): string {
    const message = [this.message, this.account, this.nonce];
    return message.join("\n");
  }

  static verify(message: string, signature: string): string {
    const signerAddress = utils.verifyMessage(message, signature);
    return signerAddress;
  }

  async signMessage(signer: Signer): Promise<string> {
    const message = this.formatMessage();
    const signature = await signer.signMessage(message);
    return signature;
  }

  static parseMessage(message: string) {
    /* eslint-disable no-useless-escape */
    // const MSG_RE = "(?<message>(?<=Message:)[sS]*?(?=Wallet Address:))";
    const ACCOUNT_RE = "(?<address>0x[a-zA-Z0-9]{40})";
    const NONCE_RE =
      "(?<nonce>)[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}";
    // const MESSAGE_RE = MSG_RE + ACCOUNT_RE + NONCE_RE;
    const NONCE_REGEX = new RegExp(NONCE_RE, "g");
    const ACCOUNT_REGEX = new RegExp(ACCOUNT_RE, "g");

    const matchAcct = ACCOUNT_REGEX.exec(message);
    const matchNonce = NONCE_REGEX.exec(message);

    return {
      account: matchAcct[0],
      nonce: matchNonce[0],
    };
  }
}
