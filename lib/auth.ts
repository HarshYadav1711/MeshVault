import { Types } from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/session";
import User from "@/models/User";

export async function getCurrentUser() {
  const session = await getSessionFromCookies();
  if (!session?.sub || !Types.ObjectId.isValid(session.sub)) {
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(session.sub).select("_id name email").lean();
  if (!user) {
    return null;
  }

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
  };
}
