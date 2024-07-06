// import { NextRequest, NextResponse } from "next/server";

// const RPC = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

// type TokenMetadata = {
//   decimals: number;
//   name: string;
//   symbol: string;
//   logo: string;
// };

// type Data =
//   | {
//       address: string;
//       tokenBalances: Array<{
//         contractAddress: string;
//         tokenBalance: string;
//         tokenName: string;
//         tokenSymbol: string;
//         tokenLogo: string;
//       }>;
//     }
//   | { error: string };

// async function fetchTokenMetadata(
//   contractAddress: string
// ): Promise<TokenMetadata> {
//   const res = await fetch(RPC, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       method: "alchemy_getTokenMetadata",
//       params: [contractAddress],
//       id: 1,
//     }),
//   });

//   const data = await res.json();

//   if (data.error) {
//     throw new Error(data.error.message);
//   }

//   console.log("RESULTS", data.result);

//   return data.result as TokenMetadata;
// }

// export async function GET(req: NextRequest): Promise<NextResponse<Data>> {
//   const { searchParams } = new URL(req.url);
//   const address = searchParams.get("address");

//   if (!address) {
//     return NextResponse.json(
//       { error: "Missing address parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     const body = {
//       jsonrpc: "2.0",
//       method: "alchemy_getTokenBalances",
//       params: [address],
//       id: 1,
//     };

//     const res = await fetch(RPC, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     const tokenBalances = await Promise.all(
//       data.result.tokenBalances.map(async (token: any) => {
//         const tokenMetadata = await fetchTokenMetadata(token.contractAddress);
//         const readableBalance =
//           parseInt(token.tokenBalance, 16) /
//           Math.pow(10, tokenMetadata.decimals);
//         return {
//           contractAddress: token.contractAddress,
//           tokenBalance: readableBalance.toString(),
//           tokenName: tokenMetadata.name,
//           tokenSymbol: tokenMetadata.symbol,
//           tokenLogo: tokenMetadata.logo,
//         };
//       })
//     );

//     // Filter tokens to include only those with all fields present
//     const filteredTokenBalances = tokenBalances.filter(
//       (token) =>
//         token.contractAddress &&
//         token.tokenBalance &&
//         token.tokenName &&
//         token.tokenSymbol &&
//         token.tokenLogo
//     );

//     return NextResponse.json(
//       { address: data.result.address, tokenBalances: filteredTokenBalances },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";

const RPC = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
// `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

type TokenMetadata = {
  decimals: number;
  name: string;
  symbol: string;
  logo: string;
};

type Data =
  | {
      address: string;
      tokenBalances: Array<{
        contractAddress: string;
        tokenBalance: string;
        tokenName: string;
        tokenSymbol: string;
        tokenLogo: string;
      }>;
    }
  | { error: string };

async function fetchTokenMetadata(
  contractAddress: string
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
      id: 1,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result as TokenMetadata;
}

export async function GET(req: NextRequest): Promise<NextResponse<Data>> {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain");

  if (!chain || (chain !== "1" && chain !== "8453")) {
    return NextResponse.json(
      { error: "Invalid or missing chain parameter" },
      { status: 400 }
    );
  }

  if (!address) {
    return NextResponse.json(
      { error: "Missing address parameter" },
      { status: 400 }
    );
  }

  try {
    const body = {
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address],
      id: chain,
    };

    const res = await fetch(RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const tokenBalances = await Promise.all(
      data.result.tokenBalances.map(async (token: any) => {
        const tokenMetadata = await fetchTokenMetadata(token.contractAddress);
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

    // Filter tokens to include only those with all fields present
    const filteredTokenBalances = tokenBalances.filter(
      (token) =>
        token.contractAddress &&
        token.tokenBalance &&
        token.tokenName &&
        token.tokenSymbol &&
        token.tokenLogo
    );

    return NextResponse.json(
      { address: data.result.address, tokenBalances: filteredTokenBalances },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
