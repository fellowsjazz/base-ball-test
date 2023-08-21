import React from 'react'
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useBalance } from 'wagmi'

export default function ProfileInfo() {
const {user, exportWallet} = usePrivy()
const { data, isError, isLoading } = useBalance({
  address: user?.wallet?.address,
})

  return (
    <Box color={"white"} border={"1px"} p={"2%"}>
      <Text>Your Base Ball Wallet Address: </Text>
      <Text>{user?.wallet?.address}</Text>
      <Text>Your Base Ball Wallet Balance: </Text>
      <Text>{data?.formatted}</Text>
      <Flex justify={"space-around"} p={"2%"}>
        <a href={`https://basescan.org/address/${user?.wallet?.address}`} target='_blank'><Button>Basescan</Button></a>
        <Button onClick={exportWallet}>Export Wallet</Button>
      </Flex>
    </Box>
  )
}
