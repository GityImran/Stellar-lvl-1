import { server } from "./stellar";
import { friendlyStellarError } from "./errors";

export async function getXlmBalance(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);

    const balance = account.balances.find(
      (balance) => balance.asset_type === "native"
    );

    return {
      success: true,
      balance: balance?.balance || "0",
    };
  } catch (error) {
    return {
      success: false,
      error: friendlyStellarError(error),
    };
  }
}