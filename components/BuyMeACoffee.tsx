"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  TransactionButton,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "../utils/contract";
import styles from "./BuyMeACoffee.module.css";

const truncateWalletAddress = (address: string | any[]) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const convertDate = (timestamp: any) =>
  new Date(Number(timestamp) * 1000).toLocaleString();

export const BuyMeACoffee = () => {
  const [tipAmount, setTipAmount] = useState(0);
  const [message, setMessage] = useState("");
  const { data: totalCoffee, refetch: refetchTotalCoffee } = useReadContract({
    contract,
    method: "getTotalCoffee",
  });
  const { data: contractEvents, refetch: refetchContractEvents } =
    useContractEvents({
      contract,
    });

  const handleTransactionConfirmed = useCallback(() => {
    alert("Transaction Confirmed");
    setTipAmount(0);
    setMessage("");
    refetchTotalCoffee();
    refetchContractEvents();
  }, [refetchTotalCoffee, refetchContractEvents]);

  const isFormValid = useMemo(
    () => message && tipAmount > 0,
    [message, tipAmount]
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Tip Amount</label>
        <p className={styles.helperText}>Must be greater than 0</p>
        <input
          type="number"
          value={tipAmount}
          onChange={(e) => setTipAmount(Number(e.target.value))}
          step={0.001}
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Message</label>
        <p className={styles.helperText}>Up to you!</p>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          className={styles.input}
        />
      </div>
      {isFormValid && (
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract,
              method: "buyMeACoffee",
              params: [message],
              value: BigInt(toWei(tipAmount.toString())),
            })
          }
          onTransactionConfirmed={handleTransactionConfirmed}
          className={styles.transactionButton}
        >
          Buy A Coffee
        </TransactionButton>
      )}
      <div>
        <h3 className={styles.totalCoffee}>
          Total Coffees: {totalCoffee?.toString()}
        </h3>
        <p className={styles.recentCoffees}>Recent Coffees:</p>
        {contractEvents?.length &&
          contractEvents.length > 0 &&
          [...(contractEvents || [])].reverse().map((event, index) => (
            <div key={index} className={styles.event}>
              <div className={styles.eventHeader}>
                <p className={styles.eventAddress}>
                  {truncateWalletAddress(
                    (event.args as Record<string, unknown>).sender as string
                  )}
                </p>
                <p className={styles.eventTimestamp}>
                  {convertDate(
                    (event.args as Record<string, unknown>).timestamp
                  )}
                </p>
              </div>
              <p className={styles.eventMessage}>
                {
                  (event.args as Record<string, unknown>)
                    .message as React.ReactNode
                }
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
