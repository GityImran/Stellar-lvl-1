import {
  BASE_FEE,
  Networks,
  Operation,
  TransactionBuilder,
  Asset,
} from "@stellar/stellar-sdk";

import { server } from "./stellar";
import { signTx } from "./wallet";
import { friendlyStellarError } from "./errors";

export async function sendXlm(
  sender: string,
  destination: string,
  amount: string
) {
  try {
    const sourceAccount =
      await server.loadAccount(sender);

    const transaction =
      new TransactionBuilder(
        sourceAccount,
        {
          fee: BASE_FEE,
          networkPassphrase:
            Networks.TESTNET,
        }
      )
        .addOperation(
          Operation.payment({
            destination,
            asset: Asset.native(),
            amount,
          })
        )
        .setTimeout(30)
        .build();

    const xdr =
      transaction.toXDR();

    const signed =
      await signTx(xdr);

    if (
      !signed.success ||
      !signed.signedXdr
    ) {
      throw new Error(
        signed.error
      );
    }

    const tx =
      TransactionBuilder
        .fromXDR(
          signed.signedXdr,
          Networks.TESTNET
        );

    const result =
      await server.submitTransaction(
        tx
      );

    return {
      success: true,
      hash: result.hash,
    };
  } catch (error) {
    return {
      success: false,
      error: friendlyStellarError(error),
    };
  }
}