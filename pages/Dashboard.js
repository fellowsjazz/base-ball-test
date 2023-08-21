import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import ProfileInfo from "../components/ProfileInfo";
import BaseBallInfo from "../components/BaseBallInfo";

export default function Dashboard() {
  const router = useRouter();
  const { ready, authenticated, user, logout, exportWallet } = usePrivy();
  const [walletObject, setWalletObject] = useState();
  const { wallets } = useWallets();

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  )


  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
    if (!embeddedWallet){
      router.push("/CreateWallet")
    }
    if (embeddedWallet){
      console.log(`Wallet's Chain Id: ${embeddedWallet?.chainId}`)
    }

  }, [authenticated, ready]);

  return (
    <Flex w={"100%"} h={"100%"} backgroundColor={"#2596be"} justify={"center"}>
      <Flex
        direction={"column"}
        w={"100vw"}
        h={"100vh"}
        align={"center"}
        mt={"1%"}
      >
        <Flex justify={"right"} mr={"5%"}  w={"100vw"}>
          <Button onClick={logout}>Log Out</Button>
        </Flex>
        <Text fontSize="4xl" fontFamily={"body"} color={"white"}>
          BASE BALL Dashboard
        </Text>
        <BaseBallInfo/>
        <ProfileInfo/>
      </Flex>
    </Flex>
  );
}
