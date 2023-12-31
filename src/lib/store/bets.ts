import { settings, settingsErrors } from "$lib/store/settings";
import type { Color } from "$lib/types/color";
import { derived } from "svelte/store";

const getMultipyOfColor = (color: Color) => {
  switch (color) {
    case "WHITE": return 2
    case "RED": return 3
    case "GREEN": return 5
    case "GOLD": return 10
  }
}

export const bets = derived([settings, settingsErrors], ($values) => {
  const settings = $values[0]
  const errors = $values[1]
  if (errors.betMultiplySize || errors.colorToBet || errors.startBetSize) return []
  const multiplyOfColor = getMultipyOfColor(settings.colorToBet)
  const info = {
    bet: settings.startBetSize,
    cost: settings.startBetSize,
    potentialPlus: settings.startBetSize * multiplyOfColor - settings.startBetSize,
  }
  const infos = [{...info}]

  for (let i = 0; i < 99; i++) {
    const previousInfo = info;
    info.bet = Math.floor(previousInfo.bet * multiplyOfColor - previousInfo.cost - previousInfo.bet > 0 
      ? previousInfo.bet 
      : previousInfo.bet * settings.betMultiplySize);
    info.cost = infos.reduce((p, c) => p + c.bet, 0) + info.bet;
    info.potentialPlus = Math.floor(info.bet * multiplyOfColor-info.cost)
    infos.push({...info})
  }

  return infos
})

export const betsForBalance = derived([bets, settings], ($values) => {
  const bets = $values[0]
  const settings = $values[1]
  return bets.filter((b) => b.cost <= settings.balanceBeforeBet)
})
