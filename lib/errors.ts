function cleanupMessage(message: string) {
  return message
    .replace(/^(Error:\s*)/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function toUserMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return cleanupMessage(error.message) || fallback;
  if (typeof error === "string") return cleanupMessage(error) || fallback;

  try {
    const maybe = JSON.stringify(error);
    if (maybe && maybe !== "{}") return cleanupMessage(maybe);
  } catch {
    // ignore
  }

  return fallback;
}

export function friendlyStellarError(error: unknown) {
  const raw = toUserMessage(error, "Something went wrong.");
  const lower = raw.toLowerCase();

  if (lower.includes("freighter")) {
    return "Freighter wallet is required to sign this transaction.";
  }

  if (lower.includes("user") && (lower.includes("reject") || lower.includes("declin"))) {
    return "You cancelled the request in Freighter.";
  }

  if (lower.includes("not connected") || lower.includes("not installed")) {
    return "Freighter doesn’t seem connected. Make sure it’s installed and unlocked.";
  }

  if (lower.includes("op_no_destination") || lower.includes("destination")) {
    return "Recipient account doesn’t exist on Testnet. Fund it first (Friendbot) and try again.";
  }

  if (lower.includes("timeout") || lower.includes("network") || lower.includes("failed to fetch")) {
    return "Network hiccup talking to Horizon. Please retry in a moment.";
  }

  if (lower.includes("insufficient") || lower.includes("low reserve")) {
    return "Insufficient balance (or you’re hitting minimum reserve requirements).";
  }

  return raw;
}

