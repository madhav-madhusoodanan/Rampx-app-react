import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': response.headers.get('content-type') || 'image/png',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
    }
}

