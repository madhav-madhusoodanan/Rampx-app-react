import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const query = await req.json();
    const response = await fetch("https://graph.codex.io/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.CODEX_API_KEY}`,
      },
      body: JSON.stringify({ query: query.query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (response.ok) return NextResponse.json(data);
    return NextResponse.json({ data: {} }, { status: 400 });
  } catch (error) {
    console.log("error fetching external api ======>", error);
    return NextResponse.json({ data: {}, error: error }, { status: 400 });
  }
}
