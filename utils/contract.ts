import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { contractABI } from "./contractABI";

const contractAddress = "0xB352b5016bFE132dC08F8d90Bd32A7D1393d027A";

export const contract = getContract({
  client: client,
  chain: chain,
  address: contractAddress,
  abi: contractABI,
});
