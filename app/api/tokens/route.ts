import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url =
      "https://li.quest/v1/tokens?chains=ETH%2CPOL%2CBLS%2CBAS%2CSEI&chainTypes=EVM";
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (data) return NextResponse.json({ data: data.tokens }, { status: 200 });
    return NextResponse.json({ data: {} }, { status: 400 });
  } catch (error) {
    console.log("error fetching tokens list ======>", error);
    return NextResponse.json({ data: {}, error: error }, { status: 400 });
  }
}
