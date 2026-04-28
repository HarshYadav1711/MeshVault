export type RequestStatus = "pending" | "in_progress" | "completed";

export function normalizeRequestStatus(status: string): RequestStatus {
  if (status === "open") {
    return "pending";
  }

  if (status === "done") {
    return "completed";
  }

  if (status === "in_progress") {
    return "in_progress";
  }

  return status === "completed" ? "completed" : "pending";
}
