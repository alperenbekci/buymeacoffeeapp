"use client";

import React from "react";
import { defineChain } from "thirdweb";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { BuyMeACoffee } from "../../components/BuyMeACoffee";
import { useActiveAccount } from "thirdweb/react";
import styles from "./Home.module.css";

export default function Home() {
  const account = useActiveAccount();
  const wallets = [
    createWallet("io.metamask"),
    inAppWallet({
      auth: {
        options: ["email", "google", "apple"],
      },
    }),
    createWallet("app.phantom"),
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buy Me A Coffee App on baseSepolia</h1>
      <ConnectButton
        client={client}
        accountAbstraction={{
          chain: defineChain(chain),
          sponsorGas: true,
        }}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            accentText: "#808080",
            accentButtonBg: "#808080",
            primaryButtonBg: "#ffffff",
          },
        })}
        connectModal={{
          size: "compact",
          titleIcon: "",
          showThirdwebBranding: false,
        }}
      />

      {account ? (
        <BuyMeACoffee />
      ) : (
        <div className={styles.infoSection}>
          <p className={styles.infoTitle}>
            👋 Welcome to the Buy Me A Coffee App!
          </p>
          <p className={styles.infoText}>☕ Support your creator.</p>
          <p className={styles.infoText}>
            🔒 Secure transactions on the baseSepolia blockchain.
          </p>
          <p className={styles.infoText}>
            🛡️ Use MetaMask, Phantom, or social-login.
          </p>
          <p className={styles.infoText}>
            🎉 Enjoy a smooth, gas-free experience with account abstraction.
          </p>
          <p className={styles.connectMessage}>
            Please connect your wallet to continue.
          </p>
        </div>
      )}
    </div>
  );
}
