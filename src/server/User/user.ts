import { db } from "@/server/db";

export const getUser = async (data: { id: number }) => {
  const user = await db.user.findFirst({ where: { id: data.id } });
  return Response.json(user);
};

export const getUsers = async () => {
  const users = await db.user.findMany();
  return Response.json(users);
};
