import { SWAP_API_URL } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import { z } from "zod";

const bodySchema = z.object({
  chainId: z.number(),
  sellToken: z.string(),
  buyToken: z.string(),
  sellAmount: z.string().optional(),
  buyAmount: z.string().optional(),
  taker: z.string(),
  swapFeeRecipient: z.string().optional(),
  swapFeeBps: z.number().optional(),
  swapFeeToken: z.string().optional(),
  tradeSurplusRecipient: z.string().optional(),
  gasPrice: z.string().optional(),
  slippageBps: z.number().optional(),
  txOrigin: z.string().optional(),
});

type Body = z.infer<typeof bodySchema>;

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    if (!isValidBody(body)) {
      return NextResponse.json("invalid parameters", { status: 402 });
    }

    const res = await fetch(`${SWAP_API_URL}/price?${qs.stringify(body)}`, {
      headers: {
        "0x-api-key": process.env.ZEROX_SWAP_API_KEY as string,
        "0x-version": "v2",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 201 });
    }

    return NextResponse.json(
      { error: "Error fetching price" },
      { status: 500 }
    );
  } catch (error) {
    console.log("=====error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

function isValidBody(body: any): body is Body {
  const { success } = bodySchema.safeParse(body);
  return success;
}
