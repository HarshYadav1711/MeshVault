export type AssetRequestModel = {
  userId: string;
  title: string;
  description: string;
  referenceImageUrl?: string;
  status: "open" | "in_progress" | "done";
  createdAt: Date;
  updatedAt: Date;
};
