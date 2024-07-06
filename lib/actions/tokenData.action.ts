"use server";

import {
  ApiResponse,
  GetErc20TokenBySearchParams,
  GetUserErc20TokensParams,
  TokenMetadata,
} from "@/types";
import exp from "constants";

import { createPublicClient, http } from "viem";
import { mainnet, base, blast } from "viem/chains";
import { filterUniqueContracts } from "../utils";
import { formatEther } from "viem";
// import { NextResponse } from "next/server";

async function fetchTokenMetadata(
  contractAddress: string,
  RPC: string,
  chainId: number
): Promise<TokenMetadata> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [contractAddress],
      id: chainId,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result as TokenMetadata;
}

export async function getUserErc20Tokens(params: GetUserErc20TokensParams) {
  if (!process.env.ALCHEMY_API_KEY) {
    console.log("No API key found");
    return;
  }

  const { chainId, address, contractAddress } = params;

  const RPC = `https://${
    chainId === 1 ? "eth" : chainId === 81457 ? "blast" : "base"
  }-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  if (!chainId || (chainId !== 1 && chainId !== 8453 && chainId !== 81457)) {
    console.log("Invalid chain");
    return;
  }

  try {
    if (chainId === 1 || chainId === 8453) {
      const body = {
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [address],
        id: chainId,
      };

      const res = await fetch(RPC, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error.message);
      }

      const tokenBalances = await Promise.all(
        data.result.tokenBalances.map(async (token: any) => {
          const tokenMetadata = await fetchTokenMetadata(
            token.contractAddress,
            RPC,
            chainId
          );
          const readableBalance =
            parseInt(token.tokenBalance, 16) /
            Math.pow(10, tokenMetadata.decimals);
          return {
            contractAddress: token.contractAddress,
            tokenBalance: readableBalance.toString(),
            tokenName: tokenMetadata.name,
            tokenSymbol: tokenMetadata.symbol,
            tokenLogo: tokenMetadata.logo,
          };
        })
      );

      // TODO - Filter tokens to include only those with all fields present
      const filteredTokenBalances = tokenBalances;
      // .filter((token) =>
      //     token.contractAddress &&
      //     token.tokenBalance &&
      //     token.tokenName &&
      //     token.tokenSymbol &&
      //     token.tokenLogo
      // );

      return {
        address: data.result.address,
        tokenBalances: filteredTokenBalances,
      };
    } else {
      // const apiUrl = `https://api.blastscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=20&startblock=0&endblock=latest&sort=asc&apikey=${process.env.BLASTSCAN_API_KEY}`;

      const apiUrl = `https://api.blastscan.io/api?module=account&action=tokentx&address=0xA346654d8C0f9d256e5b00aaa1Fd89582D5D75ae&page=1&offset=20&startblock=0&endblock=latest&sort=asc&apikey=${process.env.BLASTSCAN_API_KEY}`; // TODO - TEST ADDRESS MUST REMOVE AND ADD address VARIABLE

      const response = await fetch(apiUrl);
      const data: ApiResponse = await response.json();
      const uniqueContracts = filterUniqueContracts(data);

      const contractsArray = Object.values(uniqueContracts);

      const publicClient = createPublicClient({
        chain: blast,
        transport: http(
          `https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        ),
      });

      const balancePromises = contractsArray.map(async (contract) => {
        const balance = await publicClient.readContract({
          address: contract.contractAddress as `0x${string}`,
          abi: [
            {
              constant: true,
              inputs: [
                {
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  name: "balance",
                  type: "uint256",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "balanceOf",
          args: ["0xA346654d8C0f9d256e5b00aaa1Fd89582D5D75ae" as `0x${string}`], // TODO - TEST ADDRESS MUST REMOVE AND ADD address VARIABLE
          // args: [address as `0x${string}`],
        });
        contract.tokenBalance = formatEther(balance);
        return contract;
      });

      const tokenData = await Promise.all(balancePromises);

      return {
        address: address,
        tokenBalances: tokenData,
      };
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getErc20TokenDataBySearch(
  params: GetErc20TokenBySearchParams
) {
  if (!process.env.ALCHEMY_API_KEY) {
    console.log("No API key found");
    return;
  }

  const { chainId, contractAddress } = params;

  if (!contractAddress) {
    return;
  }

  const RPC = `https://${
    chainId === 1 ? "eth" : chainId === 81457 ? "blast" : "base"
  }-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  if (!chainId || (chainId !== 1 && chainId !== 8453 && chainId !== 81457)) {
    console.log("Invalid chain");
    throw new Error("Invalid chain");
    // return;
  }

  try {
    const tokenData = await fetchTokenMetadata(contractAddress, RPC, chainId);

    return {
      contractAddress,
      tokenName: tokenData.name,
      tokenSymbol: tokenData.symbol,
      tokenLogo: tokenData.logo,
    };
  } catch (e) {
    console.error(e);
  }
}

export async function testBlastTokens(address: string) {
  const apiUrl = `https://api.blastscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=20&startblock=0&endblock=latest&sort=asc&apikey=${process.env.BLASTSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data: ApiResponse = await response.json();
    const uniqueContracts = filterUniqueContracts(data);

    const contractsArray = Object.values(uniqueContracts);

    const publicClient = createPublicClient({
      chain: blast,
      transport: http(
        `https://blast-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      ),
    });

    const balancePromises = contractsArray.map(async (contract) => {
      const balance = await publicClient.readContract({
        address: contract.contractAddress as `0x${string}`,
        abi: [
          {
            constant: true,
            inputs: [
              {
                name: "_owner",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                name: "balance",
                type: "uint256",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      });
      contract.tokenBalance = formatEther(balance);
      return contract;
    });

    const tokenData = await Promise.all(balancePromises);

    return {
      address: address,
      tokenBalances: tokenData,
    };
  } catch (error) {
    console.log(error);
  }

  // const balanceOf = await publicClient.readContract({
  //   address: "0x4300000000000000000000000000000000000003" as `0x${string}`,
  //   abi: [
  //     {
  //       constant: true,
  //       inputs: [
  //         {
  //           name: "_owner",
  //           type: "address",
  //         },
  //       ],
  //       name: "balanceOf",
  //       outputs: [
  //         {
  //           name: "balance",
  //           type: "uint256",
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //   ],
  //   functionName: "balanceOf",
  //   args: [address as `0x${string}`],
  // });

  // return formatEther(balanceOf);
}

/*
QNIT8PK743QFT87RMC56BBE24HVJ7R8ZTC API_KEY

0xA346654d8C0f9d256e5b00aaa1Fd89582D5D75ae TEST_ADDRESS

https://api.blastscan.io/api?module=account&action=tokentx&address=0xA346654d8C0f9d256e5b00aaa1Fd89582D5D75ae&page=1&offset=2&startblock=0&endblock=latest&sort=asc&apikey=QNIT8PK743QFT87RMC56BBE24HVJ7R8ZTC
*/
