import { prisma } from "$lib/server/db";

export async function load() {
  const servers = await prisma.server.findMany()

	return {servers};
}