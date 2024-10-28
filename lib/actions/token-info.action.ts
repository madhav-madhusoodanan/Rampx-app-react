'use server'

export const fetchTokenInfo = async (chainId: number, contractAddress: string) => {
    // Add base URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/token-data/info?chainId=${chainId}&contractAddress=${contractAddress}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
