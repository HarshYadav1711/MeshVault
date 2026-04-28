export function getApiErrorMessage(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes("e11000") || lower.includes("duplicate key")) {
    return "An account with this email already exists";
  }

  if (
    lower.includes("authentication failed") ||
    lower.includes("bad auth") ||
    lower.includes("auth failed")
  ) {
    return "Database authentication failed. Verify your Atlas username/password in MONGODB_URI.";
  }

  if (
    lower.includes("timed out") ||
    lower.includes("server selection") ||
    lower.includes("enotfound") ||
    lower.includes("querysrv")
  ) {
    return "Database connection failed. Verify MONGODB_URI, Atlas network access allowlist, and internet DNS connectivity.";
  }

  return fallback;
}
