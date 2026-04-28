import {
  getAddress,
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import { friendlyStellarError } from "./errors";

export async function connectWallet() {
  try {
    const access = await requestAccess();

    if (access.error) {
      throw new Error(access.error);
    }

    const address = await getAddress();

    if (address.error) {
      throw new Error(address.error);
    }

    return {
      success: true,
      address: address.address,
    };
  } catch (error) {
    return {
      success: false,
      error: friendlyStellarError(error),
    };
  }
}

export async function checkWalletConnection() {
  const connected = await isConnected();

  return connected.isConnected;
}

export async function signTx(
  xdr: string
) {
  try {
    const signed = await signTransaction(
      xdr,
      {
        networkPassphrase:
          "Test SDF Network ; September 2015",
      }
    );

    if (signed.error) {
      throw new Error(signed.error);
    }

    return {
      success: true,
      signedXdr: signed.signedTxXdr,
    };
  } catch (error) {
    return {
      success: false,
      error: friendlyStellarError(error),
    };
  }
}