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
    [sepolia, gnosis, gnosisChiado, optimismGoerli, mantleTestnet],
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
