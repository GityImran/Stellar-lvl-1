# Stellar Pay 🚀

A modern Stellar Testnet payment dApp built with Next.js, TypeScript, Tailwind CSS, Stellar SDK, and Freighter Wallet.

This project was built as part of the **Level 1 – White Belt Stellar Development Challenge**.

---

# 📌 Overview

Stellar Pay is a beginner-friendly decentralized application (dApp) that allows users to:

- Connect their Freighter wallet
- View their XLM balance
- Send XLM transactions on Stellar Testnet
- View transaction history
- Get transaction confirmations with explorer links

The application interacts directly with the Stellar blockchain through the Stellar Horizon API.

---

# ✨ Features

## 🔐 Wallet Connection
- Connect Freighter wallet
- Disconnect wallet
- Detect wallet connection status

---

## 💰 Balance Handling
- Fetch XLM balance from Stellar Testnet
- Display live account balance
- Refresh balance manually and automatically after transactions

---

## 💸 XLM Transactions
- Send XLM to another Stellar address
- Transaction signing through Freighter
- Validation for:
  - invalid addresses
  - invalid amounts
  - insufficient balance

---

## 📜 Transaction History
- View recent payment transactions
- See sent and received transfers
- Open transaction details in Stellar Expert explorer

---

## 🎨 Modern UI
- Responsive layout
- Clean card-based interface
- Real-time status messages
- Loading states and error handling

---

# 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| @stellar/stellar-sdk | Blockchain interaction |
| @stellar/freighter-api | Wallet integration |
| Stellar Horizon API | Blockchain data access |

---

# 🌐 Stellar Network

This application uses:

- **Stellar Testnet**
- Testnet Horizon endpoint
- Testnet network passphrase

⚠️ This app is NOT configured for mainnet.

---
