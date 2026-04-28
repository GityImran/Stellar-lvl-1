import { StrKey } from "@stellar/stellar-sdk";

export function isValidPublicKey(value: string) {
  return StrKey.isValidEd25519PublicKey(value.trim());
}

export function isValidAmount(value: string) {
  const num = Number(value);
  return Number.isFinite(num) && num > 0;
}

export function shortAddress(value: string) {
  if (!value) return "";
  return `${value.slice(0, 6)}...${value.slice(-6)}`;
}