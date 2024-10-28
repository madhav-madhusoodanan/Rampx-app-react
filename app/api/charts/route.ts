import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const chainId = searchParams.get("chainId");
  const contractAddress = searchParams.get("contractAddress");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  try {
    const url = `https://api.chainbase.online/v1/token/price/history?chain_id=${chainId}&contract_address=${contractAddress}&from_timestamp=${startTime}&end_timestamp=${endTime}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": process.env.CHAINBASE_API_KEY || "",
        accept: "application/json",
      } as HeadersInit,
    });
    const data = await res.json();

    if (data) return NextResponse.json({ ...data }, { status: 200 });
    return NextResponse.json({ data: {} }, { status: 400 });
  } catch (error) {
    console.log("error fetching tokens list ======>", error);
    return NextResponse.json({ data: {}, error: error }, { status: 400 });
  }
}
