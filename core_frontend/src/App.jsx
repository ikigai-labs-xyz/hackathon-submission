import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { sepolia } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Dashboard from "./pages/dashboard"

function App() {
  const { chains, provider } = configureChains(
    [sepolia],
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

  const router = createBrowserRouter([{ path: "/", element: <Dashboard /> }])

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
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
