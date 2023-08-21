import "../styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { mainnet, goerli, base } from "@wagmi/core/chains";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";


const configureChainsConfig = configureChains([base], [publicProvider()]);

const handleLogin = (user) => {
  console.log(`User ${user.id} logged in!`);
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        onSuccess={handleLogin}
        config={{
          loginMethods: ["email", "wallet", "twitter", "google"],
          appearance: {
            theme: "light",
            accentColor: "#2596be",

            showWalletLoginFirst: false,
          },
        }}
      >
        <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
          <Component {...pageProps} />
        </PrivyWagmiConnector>
      </PrivyProvider>
    </ChakraProvider>
  );
}

export default MyApp;
