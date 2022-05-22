import axios from "axios";
import { TokenMetaData, PinataResponse } from "../typings";

const PINATA_API_KEY = "56183b19a47fa75aff20";
const PINATA_SECRET_API_KEY =
  "cd2e1b93be913b893d7b4d73795f8e3da78d4eec8e64ce4b782f3796f3d9440c";

export async function pinFileToIPFS(file: File) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await axios.post<PinataResponse>(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      form,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );
    // upload to s3 too

    return {
      image: `ipfs://${data.IpfsHash}`,
      // image_url: "", //from s3
    };
  } catch (error) {
    throw new Error("Unable to complete the file upload " + error);
  }
}

export async function pinJSONToIPFS(metadata: TokenMetaData) {
  const { data } = await axios.post<PinataResponse>(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    JSON.stringify(metadata),
    {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    }
  );

  return {
    baseURI: "ipfs://",
    uri: data.IpfsHash,
  };
}
