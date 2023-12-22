import { settings, settingsErrors } from "$lib/store/settings";
import type { Color } from "$lib/types/color";
import { derived, get } from "svelte/store";

const getMultipyOfColor = (color: Color) => {
  switch (color) {
    case "white": return 2
    case "red": return 3
    case "green": return 5
    case "gold": return 10
  }
}

export const bets = derived(settings, ($settings) => {
  const errors = get(settingsErrors)
  if (errors.betMultiplySize || errors.colorToBet || errors.startBetSize) return []
  const multiplyOfColor = getMultipyOfColor($settings.colorToBet)
  const info = {
    bet: $settings.startBetSize,
    cost: $settings.startBetSize,
    potentialPlus: $settings.startBetSize * multiplyOfColor - $settings.startBetSize,
  }
  const infos = [{...info}]

  for (let i = 0; i < 99; i++) {
    const previousInfo = info;
    info.bet = previousInfo.bet * multiplyOfColor - previousInfo.cost - previousInfo.bet > 0 
      ? previousInfo.bet 
      : previousInfo.bet * $settings.betMultiplySize;
    info.cost = infos.reduce((p, c) => p + c.bet, 0) + info.bet;
    info.potentialPlus = info.bet * multiplyOfColor-info.cost
    infos.push({...info})
  }

  return infos
})
