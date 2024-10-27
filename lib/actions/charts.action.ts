'use server'

export const fetchChartData = async (chainId: number, contractAddress: string, startTime: number, endTime: number) => {
    // Add base URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/charts?chainId=${chainId}&contractAddress=${contractAddress}&startTime=${startTime}&endTime=${endTime}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
