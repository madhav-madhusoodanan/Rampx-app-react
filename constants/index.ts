import { FooterIcon, NavLink } from "../types";
import DiscordIcon from "@/components/custom-icons/DiscordIcon";
import TelegramIcon from "@/components/custom-icons/TelegramIcon";
import RedditIcon from "@/components/custom-icons/RedditIcon";

export const NATIVE_TOKEN_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const TOKENLIST_EXPIRE_PERIOD = 24 * 60 * 60 * 1000;
export const MAX_TIME_TOAST_VISIBLE = 5000;
// TODO - Replace with correct footer href links
export const FOOTER_ICONS: FooterIcon[] = [
  {
    imgURL: "/assets/icons/x.svg",
    link: "https://twitter.com/home",
    label: "Twitter",
  },
  {
    imgURL: "/assets/icons/telegram.svg",
    link: "https://t.me",
    label: "Telegram",
  },
];

export const NAV_LINKS: NavLink[] = [
  {
    label: "trade",
    path: "/swap",
  },
  {
    label: "explore",
    path: "/explore",
  },
];

// TODO - Replace with correct social media href links
export const SOCIAL_MEDIA_LINKS = [
  {
    icon: DiscordIcon,
    link: "https://discord.com",
  },
  {
    icon: RedditIcon,
    link: "https://reddit.com",
  },
  {
    icon: TelegramIcon,
    link: "https://telegram.com",
  },
];

export const MOCK_POPULAR_TOKENS = [
  {
    contractAddress: "0x0",
    tokenName: "Ethereum",
    tokenSymbol: "ETH",
    tokenLogo: "/assets/icons/eth-logo.png",
  },
  {
    contractAddress: "0x0",
    tokenName: "Dai",
    tokenSymbol: "DAI",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    contractAddress: "0x0",
    tokenName: "Usdc",
    tokenSymbol: "USDC",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    contractAddress: "0x0",
    tokenName: "Usdt",
    tokenSymbol: "USDT",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    contractAddress: "0x0",
    tokenName: "Wbtc",
    tokenSymbol: "WBTC",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  },
  {
    contractAddress: "0x0",
    tokenName: "Wrapped Etheruem",
    tokenSymbol: "WETH",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
];

export const MOCK_TOKEN_EXPLORE_PAGE_STATS = [
  {
    contractAddress: "0x0",
    tokenName: "Ethereum",
    tokenSymbol: "ETH",
    tokenLogo: "/assets/icons/eth-logo.png",
    price: "2947.25",
    hourPnl: {
      isPositive: false,
      value: "0.57",
    },
    dayPnl: {
      isPositive: true,
      value: "2.91",
    },
    fdv: "7.2B",
    volume: "2B",
    chartData: [
      {
        stats: 0.25,
      },
      {
        stats: 1.37,
      },
      {
        stats: 0.54,
      },
      {
        stats: 2.3,
      },
      {
        stats: 0.12,
      },
      {
        stats: 0.05,
      },
      {
        stats: 5,
      },
      {
        stats: 2,
      },
    ],
  },
  {
    contractAddress: "0x0",
    tokenName: "Dai",
    tokenSymbol: "DAI",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    price: "1.00",
    hourPnl: {
      isPositive: true,
      value: "0.00",
    },
    dayPnl: {
      isPositive: true,
      value: "0.00",
    },
    fdv: "753M",
    volume: "1B",
    chartData: [
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
    ],
  },
  {
    contractAddress: "0x0",
    tokenName: "Usdt",
    tokenSymbol: "USDT",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    price: "1.00",
    hourPnl: {
      isPositive: true,
      value: "0.00",
    },
    dayPnl: {
      isPositive: true,
      value: "0.00",
    },
    fdv: "3.1B",
    volume: "1B",
    chartData: [
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
      {
        stats: 0,
      },
    ],
  },
  {
    contractAddress: "0x0",
    tokenName: "Wbtc",
    tokenSymbol: "WBTC",
    tokenLogo:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    price: "54673.32",
    hourPnl: {
      isPositive: false,
      value: "0.22",
    },
    dayPnl: {
      isPositive: false,
      value: "1.21",
    },
    fdv: "36.9B",
    volume: "500M",
    chartData: [
      {
        stats: 7.75,
      },
      {
        stats: 1.25,
      },
      {
        stats: 0.95,
      },
      {
        stats: 1.8,
      },
      {
        stats: 0.6,
      },
      {
        stats: 0.4,
      },
      {
        stats: 3.2,
      },
      {
        stats: 1.9,
      },
    ],
  },
];

export const MOCK_CHART_DATA = [
  {
    revenue: 2.25,
    // subscription: 240,
  },
  {
    revenue: 1.37,
    // subscription: 300,
  },
  {
    revenue: 0.54,
    // subscription: 200,
  },
  {
    revenue: 2.3,
    // subscription: 278,
  },
  {
    revenue: 0.12,
    // subscription: 189,
  },
  {
    revenue: 0.05,
    // subscription: 239,
  },
  {
    revenue: 5,
    // subscription: 278,
  },
  {
    revenue: 2,
    // subscription: 189,
  },
];

export const CHAIN_LOGOS = [
  {
    chainId: 1,
    networkName: "ETH",
    imageUrl: "/assets/icons/blockchains/ethereum.svg",
  },
  {
    chainId: 11155111,
    networkName: "SEPOLIA",
    imageUrl: "/assets/icons/blockchains/ethereum.svg",
  },
  {
    chainId: 8453,
    networkName: "BASE",
    imageUrl: "/assets/icons/blockchains/base.svg",
  },
  {
    chainId: 81457,
    networkName: "BLAST",
    imageUrl: "/assets/icons/blockchains/blast.svg",
  },
  {
    chainId: 1329,
    networkName: "SEI",
    imageUrl: "/assets/icons/blockchains/sei.svg",
  },
];

export const SWAP_API_URL = "https://api.0x.org/swap/permit2";

export const WETH_TOKEN_INFO = {
  chainId: 1,
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  name: "WETH",
  symbol: "WETH",
  decimals: 18,
  logoURI:
    "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
};

export const AMOUNT_INPUT_REGEX = /^((\d+[.]?\d*)|(\.\d+))$/;
