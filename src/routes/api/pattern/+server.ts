import { prisma } from "$lib/server/db.js";
import type { Color } from "$lib/types/color";
import type { Pattern } from "$lib/types/pattern";
import { json } from "@sveltejs/kit";
import { z } from "zod";

const cache: Record<number, {history: Color[], expiredAt: number}> = {}
const cacheTTL = 30 * 1000 // 30 seconds

const Schema = z.object({
  serverId: z.number().positive().step(1),
  pattern: z.array(z.object({
    color: z.enum(["WHITE", "RED", "GREEN", "GOLD"]),
    invert: z.boolean()
  }))
})

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
  const data = await request.json()
  const result = await Schema.safeParseAsync(data)
  if (!result.success) {
    return new Response(null, {status: 403})
  }
  const serverId = result.data.serverId
  const pattern: Pattern[] = result.data.pattern

  if (pattern.length === 0) {
    return json({message: "Длина шаблона должна быть минимум из 1 элемента"}, {status: 400})
  }
  if (pattern.length > 20) {
    return json({message: "Длина шаблона должна быть максимум из 20 элементов"}, {status: 400})
  }

  const history = await getBetHistoryCacheFirst(serverId)

  const percent = getPercentByPattern(history, pattern)

  return json({ percent, amountOfBets: history.length })
}

const getPercentByPattern = (history: Color[], pattern: Pattern[]) => {
  if (pattern.length === 0) return 0
  if (pattern.length === 1) {
    return history.filter(color => color === pattern[0].color && !pattern[0].invert).length / history.length * 100 
  }

  const colorHistory = [undefined, ...history] as unknown as Color[]
  let colorPatterns: Color[][] = []

  colorHistory.forEach((color, colorIndex) => {
    const colors = []
    for (let i = 0; i <= pattern.length; i++) {
      colors.push(colorHistory[colorIndex+i])
    }
    if (colors[colors.length-2] === undefined) {
      return
    }

    if (colors[0] === pattern[0].color && !pattern[0].invert) {
      return
    }
    if (colors[0] !== pattern[0].color && pattern[0].invert) {
      return
    }
    colors.shift()
    colorPatterns.push(colors as Color[])
  })

  let patternsWithoutLast = 0

  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i]
    
    if (p.invert) {
      colorPatterns = colorPatterns.filter(c => c[i] !== p.color)
    } else {
      colorPatterns = colorPatterns.filter(c => c[i] === p.color)
    }
    if (i === pattern.length-2) {
      patternsWithoutLast = colorPatterns.length
    }
  }

  if (patternsWithoutLast === 0) return 0

  return colorPatterns.length / patternsWithoutLast * 100
}

const getBetHistoryCacheFirst = async (serverId: number) => {
  const cachedData = cache[serverId]
  if (cachedData && cachedData.expiredAt > Date.now()) {
    return cachedData.history
  }

  const history = await prisma.bet.findMany({
    select: {
      result: true
    },
    orderBy: {
      betId: "asc"
    },
    where: {
      serverId
    },
  })

  cache[serverId] = {
    history: history.map(v => v.result),
    expiredAt: Date.now() + cacheTTL
  }

  return cache[serverId].history
}