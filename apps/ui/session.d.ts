import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    nonce?: string;
    account?: string;
  }
}
