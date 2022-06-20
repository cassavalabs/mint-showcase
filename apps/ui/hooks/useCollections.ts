import { useEffect, useState } from "react";
import axios from "axios";
import type { AssetCollection } from "@cassavaland/sdk";

export const useCollections = async (userWallet?: string) => {
  const [collections, setCollections] = useState<AssetCollection[] | null>(
    null
  );

  
};
