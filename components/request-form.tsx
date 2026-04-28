"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type RequestStatus = "open" | "in_progress" | "done";

type Props = {
  mode: "create" | "edit";
  request?: {
    id: string;
    title: string;
    description: string;
    referenceImageUrl: string;
    status: RequestStatus;
  };
};

export default function RequestForm({ mode, request }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      referenceImageUrl: String(formData.get("referenceImageUrl") ?? ""),
      status: String(formData.get("status") ?? "open"),
    };

    const endpoint = mode === "create" ? "/api/requests" : `/api/requests/${request?.id ?? ""}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string; request?: { _id: string } };
    if (!response.ok) {
      setError(data.error ?? "Unable to save request");
      setIsSubmitting(false);
      return;
    }

    if (mode === "create" && data.request?._id) {
      router.push(`/requests/${data.request._id}`);
    } else {
      router.refresh();
    }
  }

  async function onDelete() {
    if (!request?.id) {
      return;
    }

    setError("");
    setIsSubmitting(true);
    const response = await fetch(`/api/requests/${request.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Unable to delete request");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            maxLength={100}
            defaultValue={request?.title ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            maxLength={1000}
            defaultValue={request?.description ?? ""}
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="referenceImageUrl" className="mb-1 block text-sm font-medium text-slate-700">
            Reference Image URL (optional)
          </label>
          <input
            id="referenceImageUrl"
            name="referenceImageUrl"
            type="url"
            defaultValue={request?.referenceImageUrl ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={request?.status ?? "open"}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create request" : "Save changes"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onDelete}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-60"
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
