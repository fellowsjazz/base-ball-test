import React from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useContractRead } from "wagmi";
import { BaseBall } from "../contract-abis/BaseBall";
import SendBall from "./SendBall";

export default function BaseBallInfo() {
  const [hasBall, setHasBall] = useState(false);
  const [ballHolder, setBallHolder] = useState();
  const { user } = usePrivy();

  const { data, isError, isLoading } = useContractRead({
    address: "0xc496f160CaCAF738c75Cd1477b119f0226AFe8Ed",
    abi: BaseBall,
    functionName: "currentHolder",
  });

  useEffect(() => {
    setBallHolder(data);
  }, [data]);

  const ballHolderIsCurrentUser = ballHolder == user?.wallet.address;

  return (
    <Box color="white" border="1px" p="2%" align="center" my="2%">
    <Image src="/base-ball.png" />

    {ballHolderIsCurrentUser ? (
        <>
      <Text>🚨 You have the ball! 🚨 </Text>
      <Text mb={"1%"}> ⚾ Quick, throw it to someone!🎯 </Text>
      <SendBall/>
      </>
    ) : (
      <>
        <Text>{ballHolder}</Text>
        <Text>has the ball!</Text>
      </>
    )}
  </Box>
  );
}
