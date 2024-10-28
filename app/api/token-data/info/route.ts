import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const chainId = searchParams.get("chainId");
    const contractAddress = searchParams.get("contractAddress");

    // Add input validation
    if (!chainId || !contractAddress) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        );
    }

    try {
        const url = `https://graph.codex.io/graphql`;
        // Fix query formatting by removing extra whitespace
        const query = `
            query {
                getTokenInfo(address: "${contractAddress}", networkId: ${chainId}) {
                    address
                    cmcId
                    id
                    isScam
                    name
                    networkId
                    symbol
                    totalSupply
                    imageThumbUrl
                    imageSmallUrl
                    imageLargeUrl
                    circulatingSupply
                },
                listPairsWithMetadataForToken (tokenAddress: "${contractAddress}", networkId: ${chainId}) {
                    results {
                        pair {
                            address
                        }
                        backingToken {
                            address
                        }
                        volume
                        liquidity
                    }
                }
            }   
        `.trim(); // Trim extra whitespace

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: {
                "Authorization": process.env.CODEX_API_KEY || '',
                'Content-Type': 'application/json',
            } as HeadersInit,
        });

        const data = await res.json();

        // Check for GraphQL errors
        if (data.errors) {
            return NextResponse.json(
                { error: data.errors[0].message },
                { status: 400 }
            );
        }

        // Check for data existence
        if (data.data) {
            return NextResponse.json({ data: data.data }, { status: 200 });
        }

        return NextResponse.json(
            { error: "No data found" },
            { status: 404 }
        );
    } catch (error) {
        console.error("Error fetching token info:", error);
        return NextResponse.json(
            { error: "Failed to fetch token data" },
            { status: 500 }
        );
    }
}
