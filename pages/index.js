import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

//base ball contract address: 0xc496f160CaCAF738c75Cd1477b119f0226AFe8Ed
export default function Home() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  if (ready && authenticated && embeddedWallet) {
    router.push("/Dashboard");
  }
  if (ready && authenticated && !embeddedWallet) {
    router.push("/CreateWallet");
  }

  return (
    <Flex w={"100%"} h={"100%"} backgroundColor={"#2596be"} justify={"center"}>
      <Flex
        direction={"column"}
        w={"100vw"}
        h={"100vh"}
        align={"center"}
        mt={"5%"}
      >
        <Text fontSize="4xl" fontFamily={"body"} color={"white"}>
          BASE BALL
        </Text>
        <Image src="/base-ball.png" minW={"200px"} minH={"250px"} />
        <Button onClick={login}>LOG IN</Button>
      </Flex>
    </Flex>
  );
}
