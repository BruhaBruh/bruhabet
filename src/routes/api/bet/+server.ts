import { prisma } from "$lib/server/db.js";
import { json } from "@sveltejs/kit";
import { env } from '$env/dynamic/private'
import { z } from "zod";
import type { $Enums } from "@prisma/client";

const formSchema = z.object({
  betId: z.number().positive().step(1),
  result: z.enum(['WHITE', 'RED', 'GREEN', 'GOLD']),
  serverId: z.number().positive()
});

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
  const header = request.headers.get("Authorization")
  if (header == null || !header.startsWith('Basic ')) {
    return new Response(null, { status: 403 })
  }
  const password = header.substring(6)
  const adminPassword = env.ADMIN_PASSWORD
  if (password !== adminPassword) {
    return new Response(null, { status: 403 })
  }
  const data = await request.json()
  const result = await formSchema.safeParseAsync(data)
  if (!result.success) {
    return json({message: "Неверная форма"}, {status: 400})
  }
  const latestBetOnServer = await prisma.bet.findFirst({
    where: {
      serverId: result.data.serverId
    },
    orderBy: {
      betId: "desc"
    }
  })
  if (latestBetOnServer && latestBetOnServer.betId > result.data.betId) {
    return json({message: `Ожидается ставка от #${latestBetOnServer.betId+1}`}, {status: 400})
  }
  await prisma.bet.create({
    data: {
      betId: result.data.betId,
      result: result.data.result.toUpperCase() as $Enums.Color,
      serverId: result.data.serverId,
    }
  })

  const servers = await prisma.server.findMany()

  return json({ servers })
}