import localforage from "localforage";
import axios from "axios";

import { TokenAPIResponse, TokenInfo } from "@/types/tokens";
import { replaceZeroAddress } from "@/lib/utils";
import { setTokensListLoading } from "@/store/slices/loadings";

class TokenCache {
  tokensList: TokenInfo[] = [];

  loadTokensList = async (dispatch: any, chainId: string) => {
    dispatch(setTokensListLoading(true));
    const tokens = await this.getTokensList();
    if (tokens) {
      this.tokensList = tokens[chainId];
    }
    dispatch(setTokensListLoading(false));
  };

  getTokensList = async () => {
    try {
      return (await localforage.getItem(
        "tokenslist"
      )) as TokenAPIResponse | null;
    } catch (error) {
      console.error("Error fetching tokensList from localforage:", error);
      return null;
    }
  };

  setTokensList = async (tokenList: TokenAPIResponse) => {
    try {
      await localforage.setItem("tokenslist", tokenList);
      await localforage.setItem("lastTokenUpdated", Date.now());
    } catch (error) {
      console.error("Error storing tokensList:", error);
      return null;
    }
  };

  fetchTokensList = async () => {
    try {
      const tokensRes = await axios.get<{ data: TokenAPIResponse }>(
        "api/tokens"
      );

      if (tokensRes.status === 200) {
        const res = replaceZeroAddress(tokensRes.data.data);
        this.setTokensList(res);
      }
    } catch (error) {
      console.log("Error fetching list", error);
    }
  };

  getLastTokenUpdated = async () => {
    try {
      return (await localforage.getItem("lastTokenUpdated")) as number | null;
    } catch (error) {
      console.error("Error fetching lastTokenUpdated from localforage:", error);
      return null;
    }
  };
}

const TokenCacheService = new TokenCache();

export default TokenCacheService;
