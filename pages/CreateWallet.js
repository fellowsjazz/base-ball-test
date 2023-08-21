import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { ready, authenticated, user, logout, createWallet } = usePrivy();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
    if (embeddedWallet) {
      router.push("/Dashboard");
    }
  }, [authenticated, ready, createWallet]);

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      backgroundColor={"#2596be"}
      justify={"center"}
      align={"center"}
    >
      <Flex
        direction={"column"}
        w={"100vw"}
        h={"100vh"}
        align={"center"}
        mt={"1%"}
      >
        <Flex justify={"right"} mr={"5%"} w={"100vw"}>
          <Button onClick={logout}>Log Out</Button>
        </Flex>
        <Text fontSize="4xl" fontFamily={"body"} color={"white"} mb={"1%"}>
          Create your Base Ball Wallet
        </Text>
        <Text color={"white"}>
          This is a new wallet that will be created for you to easily play Base
          Ball
        </Text>
        <Text color={"white"}>
          You can export the wallet at any time to use it with other apps!
        </Text>
        <Button mt="3%" onClick={createWallet}>
          Give me my wallet!!
        </Button>
      </Flex>
    </Flex>
  );
}
