import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { LOGIN_MESSAGE, Web3Auth } from "@cassavaland/sdk";
import { Alert } from "@cassavaland/uikits";
import { useActiveWeb3 } from "./useWeb3";

export const useAuth = () => {
  const { account, library, deactivate } = useActiveWeb3();
  const router = useRouter();

  const isconnected = !!account;

  const login = async (): Promise<void> => {
    console.log("active account " + account);
    try {
      const signer = new ethers.providers.Web3Provider(
        (window as any).ethereum
      ).getSigner();

      //Generate Nonce
      const {
        data: { nonce },
      } = await axios.get<{ nonce: string }>("/api/auth/nonce");

      //Generate Message
      const web3Auth = new Web3Auth({
        nonce,
        message: LOGIN_MESSAGE,
        account,
      });

      //Request for user signature
      const signature = await web3Auth.signMessage(signer);

      //Verify Signature
      const {
        data: { verified },
      } = await axios.post<{ verified: boolean }>("/api/auth/verify", {
        message: web3Auth.formatMessage(),
        signature,
      });

      if (!verified) {
        Alert(
          "Sorry we could not authenticate your identity, try again later",
          "error"
        );
      } else {
        Alert("Login successful", "success");
        router.push("/account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (): Promise<void> => {
    if (!account || !library) return;

    const {
      data: { ok },
    } = await axios.get<{ ok: boolean }>("/api/auth/logout");
    //Disconnect wallet
    deactivate();

    if (ok) {
      Alert("You have successfully logged out!", "success");

      //Redirect to home
      router.push("/");
    }
  };

  const confirm = async (message: string): Promise<{ confirmed: boolean }> => {
    if (!account || !library) return;

    const signer = library.getSigner(account);
    const web3Auth = new Web3Auth({
      message,
      account,
    });

    const signature = await web3Auth.signMessage(signer);
    const msg = web3Auth.formatMessage();
    const signerAddress = Web3Auth.verify(msg, signature);

    if (signerAddress.toLowerCase() !== account.toLowerCase()) {
      Alert("Signature not from connected account", "error");
      return { confirmed: false };
    }

    return { confirmed: true };
  };

  return { confirm, isconnected, login, logout };
};
