"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getOrCreateUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        firstname: user.firstName,
        lastname: user.lastName,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
      },
    });
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getClerkUserId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function getUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getClerkUserId(clerkId);
  if (!user) throw new Error("User not found");

  return user.id;
}
