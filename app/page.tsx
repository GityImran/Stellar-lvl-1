"use client";

import { useMemo, useState } from "react";

import { Nav } from "./components/Nav";
import { Alert } from "./components/ui/Alert";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader } from "./components/ui/Card";
import { Input } from "./components/ui/Input";

import { connectWallet } from "@/lib/wallet";
import { getXlmBalance } from "@/lib/balance";
import { sendXlm } from "@/lib/transaction";

import {
  isValidAmount,
  isValidPublicKey,
  shortAddress,
} from "@/lib/validate";

type PaymentRecord = {
  id: string;
  type: string;
  created_at: string;
  transaction_hash: string;
  from?: string;
  to?: string;
  amount?: string;
  asset_type?: string;
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [txHash, setTxHash] = useState("");

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [history, setHistory] =
    useState<PaymentRecord[]>([]);

  const canSend = useMemo(() => {
    return (
      Boolean(walletAddress) &&
      Boolean(destination.trim()) &&
      Boolean(amount.trim()) &&
      !loading
    );
  }, [
    walletAddress,
    destination,
    amount,
    loading,
  ]);

  async function refreshBalance(
    address: string
  ) {
    const result =
      await getXlmBalance(address);

    if (
      result.success &&
      result.balance
    ) {
      setBalance(result.balance);
    } else {
      setError(
        result.error ||
          "Failed to fetch balance"
      );
    }
  }

  async function refreshHistory(
    address: string
  ) {
    setHistoryLoading(true);

    try {
      const url = `https://horizon-testnet.stellar.org/accounts/${address}/payments?limit=25&order=desc`;

      const res = await fetch(url);

      const data = await res.json();

      const records =
        data?._embedded?.records || [];

      setHistory(
        records.filter(
          (r: PaymentRecord) =>
            r.type === "payment"
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load history"
      );
    } finally {
      setHistoryLoading(false);
    }
  }

  async function handleConnect() {
    setLoading(true);

    const result =
      await connectWallet();

    if (
      result.success &&
      result.address
    ) {
      setWalletAddress(
        result.address
      );

      await refreshBalance(
        result.address
      );

      await refreshHistory(
        result.address
      );
    } else {
      setError(
        result.error ||
          "Connection failed"
      );
    }

    setLoading(false);
  }

  function handleDisconnect() {
    setWalletAddress("");
    setBalance("");
    setDestination("");
    setAmount("");
    setHistory([]);
    setError("");
    setSuccess("");
    setTxHash("");
  }

  async function handleSend() {
    setLoading(true);

    setError("");
    setSuccess("");
    setTxHash("");

    if (
      !destination.trim() ||
      !amount.trim()
    ) {
      setError(
        "Please fill all fields."
      );

      setLoading(false);
      return;
    }

    if (
      !isValidPublicKey(destination)
    ) {
      setError(
        "Invalid recipient address."
      );

      setLoading(false);
      return;
    }

    if (!isValidAmount(amount)) {
      setError(
        "Invalid amount."
      );

      setLoading(false);
      return;
    }

    const result =
      await sendXlm(
        walletAddress,
        destination,
        amount
      );

    if (
      result.success &&
      result.hash
    ) {
      setSuccess(
        "Transaction successful."
      );

      setTxHash(result.hash);

      await refreshBalance(
        walletAddress
      );

      await refreshHistory(
        walletAddress
      );

      setDestination("");
      setAmount("");
    } else {
      setError(
        result.error ||
          "Transaction failed"
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen">

      <header className="app-container py-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black text-slate-900">
              Stellar Pay
            </h1>

            <p className="text-slate-600 mt-2 font-semibold">
              Stellar Testnet Payment dApp
            </p>

          </div>

          <Nav />

        </div>

      </header>

      <section className="app-container pb-16 space-y-8">

        {!walletAddress ? (

          <Card>

            <CardContent className="py-10">

              <Button
                onClick={
                  handleConnect
                }
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading
                  ? "Connecting..."
                  : "Connect Wallet"}
              </Button>

            </CardContent>

          </Card>

        ) : (

          <>

            {/* WALLET */}

            <Card>

              <CardContent className="py-6 space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <div className="w-3 h-3 rounded-full bg-emerald-500" />

                    <span className="font-bold text-slate-900">
                      Connected
                    </span>

                  </div>

                  <Button
                    variant="ghost"
                    onClick={
                      handleDisconnect
                    }
                  >
                    Disconnect
                  </Button>

                </div>

                <div className="rounded-2xl border-2 border-blue-200 bg-white p-5 shadow-[0_10px_0_rgba(37,99,235,0.10)]">

                  <p className="text-slate-600 text-sm font-semibold">
                    Your Address
                  </p>

                  <p className="mt-3 break-all font-mono text-sm text-slate-900">
                    {walletAddress}
                  </p>

                </div>

                <a
                  href={`https://stellar.expert/explorer/testnet/account/${walletAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-700 font-semibold"
                >
                  View on Stellar Expert →
                </a>

              </CardContent>

            </Card>

            {/* BALANCE */}

            <Card>

              <CardHeader>

                <div className="flex items-center justify-between">

                  <h2 className="text-3xl font-black">
                    Your Balance
                  </h2>

                  <Button
                    variant="secondary"
                    onClick={() =>
                      refreshBalance(
                        walletAddress
                      )
                    }
                  >
                    Refresh
                  </Button>

                </div>

              </CardHeader>

              <CardContent>

                <div className="rounded-3xl border-2 border-blue-200 bg-white p-8 shadow-[0_12px_0_rgba(37,99,235,0.10)]">

                  <p className="text-slate-600 font-semibold">
                    Available Balance
                  </p>

                  <h3 className="mt-5 text-6xl font-black text-slate-900">

                    {balance}

                    <span className="text-3xl ml-3 text-blue-700">
                      XLM
                    </span>

                  </h3>

                </div>

              </CardContent>

            </Card>

            {/* SEND + HISTORY */}

            <div className="grid gap-6 lg:grid-cols-2">

              {/* SEND */}

              <Card>

                <CardHeader>

                  <h2 className="text-3xl font-black">
                    Send Payment
                  </h2>

                </CardHeader>

                <CardContent className="space-y-4">

                  <Input
                    type="text"
                    placeholder="Recipient Address"
                    value={destination}
                    onChange={(e) =>
                      setDestination(
                        e.target.value
                      )
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value
                      )
                    }
                  />

                  <Button
                    onClick={
                      handleSend
                    }
                    disabled={!canSend}
                    size="lg"
                    className="w-full"
                  >
                    {loading
                      ? "Processing..."
                      : "Send Payment"}
                  </Button>

                </CardContent>

              </Card>

              {/* HISTORY */}

              <Card>

                <CardHeader>

                  <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-black">
                      Transaction History
                    </h2>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        refreshHistory(
                          walletAddress
                        )
                      }
                    >
                      Refresh
                    </Button>

                  </div>

                </CardHeader>

                <CardContent>

                  <div className="space-y-4 max-h-[500px] overflow-auto">

                    {historyLoading ? (

                      <p>
                        Loading...
                      </p>

                    ) : history.length ? (

                      history.map((tx) => {

                        const isSent =
                          tx.from ===
                          walletAddress;

                        return (

                          <div
                            key={tx.id}
                            className="rounded-2xl border-2 border-blue-200 bg-white p-5 shadow-[0_10px_0_rgba(37,99,235,0.10)]"
                          >

                            <div className="flex justify-between">

                              <div>

                                <p className="font-bold">

                                  {isSent
                                    ? "Sent"
                                    : "Received"}

                                </p>

                                <p className="text-2xl font-black mt-2">

                                  {isSent
                                    ? "-"
                                    : "+"}

                                  {tx.amount} XLM

                                </p>

                              </div>

                              <a
                                href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-sm"
                              >
                                Details
                              </a>

                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-600">

                              <div>

                                <p>
                                  From
                                </p>

                      <p className="font-mono mt-1 text-slate-900">

                                  {shortAddress(
                                    tx.from ||
                                      ""
                                  )}

                                </p>

                              </div>

                              <div>

                                <p>
                                  To
                                </p>

                      <p className="font-mono mt-1 text-slate-900">

                                  {shortAddress(
                                    tx.to ||
                                      ""
                                  )}

                                </p>

                              </div>

                            </div>

                          </div>

                        );
                      })

                    ) : (

                      <p>
                        No transactions found.
                      </p>

                    )}

                  </div>

                </CardContent>

              </Card>

            </div>

            {/* INFO CARDS */}

            <div className="grid gap-6 md:grid-cols-3">

              <Card>

                <CardContent className="py-8">

                  <h3 className="text-2xl font-black text-slate-900">
                    Lightning Fast
                  </h3>

                  <p className="mt-3 text-slate-600 font-semibold">
                    Transactions settle
                    in seconds on
                    Stellar network.
                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="py-8">

                  <h3 className="text-2xl font-black text-slate-900">
                    Low Fees
                  </h3>

                  <p className="mt-3 text-slate-600 font-semibold">
                    Stellar fees are
                    extremely low.
                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="py-8">

                  <h3 className="text-2xl font-black text-slate-900">
                    Secure
                  </h3>

                  <p className="mt-3 text-slate-600 font-semibold">
                    Signed securely with
                    Freighter wallet.
                  </p>

                </CardContent>

              </Card>

            </div>

          </>

        )}

        {success && (

          <Alert tone="success">

            <div className="font-bold">
              {success}
            </div>

            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View transaction
            </a>

          </Alert>

        )}

        {error && (

          <Alert tone="error">

            {error}

          </Alert>

        )}

      </section>

    </main>
  );
}