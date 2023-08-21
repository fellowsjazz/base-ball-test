import React from "react";
import { Box, Button, Flex, Text, Image, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useContractRead } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BaseBall } from "../contract-abis/BaseBall";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

export default function SendBall() {
  const [toAddress, setToAddress] = useState("");
  const { sendTransaction } = usePrivy();

  const { wallets } = useWallets();
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  useEffect(() => {
    if (embeddedWallet) {
      setActiveWallet(embeddedWallet);
    }
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xc496f160CaCAF738c75Cd1477b119f0226AFe8Ed",
    abi: BaseBall,
    functionName: "passBall",
    args: [toAddress],
  });

  const handleChange = (event) => {
    setToAddress(event.target.value);
  };

  const handleClick = () => {
    console.log("Sent to ", toAddress);
  };

  return (
    <Flex justify="center" direction="column">
      <Input
        placeholder="Enter recipient address here"
        value={toAddress}
        onChange={handleChange}
        _placeholder={{ opacity: 1, color: "white" }}
      />
      <Button mt="1%" onClick={write}>
        Throw it!
      </Button>
    </Flex>
  );
}
