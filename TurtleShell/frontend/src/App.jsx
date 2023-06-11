import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { gnosis, gnosisChiado, optimismGoerli, sepolia } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Cookie3 from "./pages/cookie3/Data"
import Dashboard from "./pages/dashboard"
import Landingpage from "./pages/landingpage"

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/48265/turtleshell/v0.0.1",
  cache: new InMemoryCache(),
})

const taiko = {
  id: 167005,
  name: "Taiko Alpha Testnet",
  network: "taiko",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.taiko.xyz"],
    },
    public: {
      http: ["https://rpc.test.taiko.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Taiko Explorer",
      url: "https://explorer.test.taiko.xyz/",
    },
  },
}

const scroll = {
  id: 534353,
  name: "Scroll Alpha Testnet",
  network: "scroll",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      // http: ['https://blockscout.scroll.io/api/eth-rpc'],
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
    public: {
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.scroll.io",
    },
  },
  // testnet: true,
}

const mantleTestnet = {
  id: 5001,
  name: "Mantle Testnet",
  network: "mantle",
  nativeCurrency: {
    name: "BITDAO",
    symbol: "BIT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: "https://rpc.testnet.mantle.xyz/",
    },
  },
  blockExplorers: {
    default: "https://explorer.testnet.mantle.xyz/",
  },
}

function App() {
  const { chains, provider } = configureChains(
    [sepolia, taiko, scroll, gnosisChiado, optimismGoerli, mantleTestnet],
    [
      alchemyProvider({ apiKey: import.meta.env.ALCHEMY_API_KEY }),
      publicProvider(),
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: "turtleshell",
    projectId: import.meta.env.WALLET_CONNECT_PROJECT_ID,
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landingpage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/cookie3",
      element: <Cookie3 />,
    },
  ])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#D9D9D9",
          accentColorForeground: "#000",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
