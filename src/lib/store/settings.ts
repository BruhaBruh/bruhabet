import type { Color } from "$lib/types/color"
import { derived, writable } from "svelte/store"
import { z } from "zod"

export const StartBetSizeSchema = z.number().min(10).step(1)
export const ColorToBetSchema = z.enum(["white", "red", "green", "gold"])
export const BetMultiplySizeSchema = z.number().min(1).step(0.01)
export const BalanceBeforeBetSchema = z.number().min(10).step(1)

export const SettingsSchema = z.object({
  startBetSize: StartBetSizeSchema,
  colorToBet: ColorToBetSchema,
  betMultiplySize: BetMultiplySizeSchema,
  balanceBeforeBet: BalanceBeforeBetSchema,
})

export type Settings = z.infer<typeof SettingsSchema>

export type SettingsErrors = Record<keyof Settings, string | null>

const initialState: Settings = {
  startBetSize: 10,
  colorToBet: "green",
  betMultiplySize: 2,
  balanceBeforeBet: 10,
}

const createSettingsStore = () => {
  const {set, update, subscribe} = writable(initialState)

  return {
    set,
    subscribe,
    setColorToBet(colorToBet: Color) {
      update(v => ({...v, colorToBet}))
    }
  }
}

export const settings = createSettingsStore()
export const settingsErrors = derived(settings, ($settings) => {
  const result = SettingsSchema.safeParse($settings)
  const errors: SettingsErrors = {
    startBetSize: null,
    colorToBet: null,
    betMultiplySize: null,
    balanceBeforeBet: null,
  }

  if (result.success) return errors

  const startBetSizeError = getZodErrorMessage(result.error.issues, ["startBetSize"])
  if (startBetSizeError) {
    errors.startBetSize = startBetSizeError.message
  }
  const colorToBetError = getZodErrorMessage(result.error.issues, ["colorToBet"])
  if (colorToBetError) {
    errors.colorToBet = colorToBetError.message
  }
  const betMultiplySizeError = getZodErrorMessage(result.error.issues, ["betMultiplySize"])
  if (betMultiplySizeError) {
    errors.betMultiplySize = betMultiplySizeError.message
  }
  const balanceBeforeBetError = getZodErrorMessage(result.error.issues, ["balanceBeforeBet"])
  if (balanceBeforeBetError) {
    errors.balanceBeforeBet = balanceBeforeBetError.message
  }

  return errors
})

const getZodErrorMessage = (issues: Zod.ZodIssue[], path: (string | number)[]) => {
  return issues.find(i => {
    if (i.path.length !== path.length) return false
    for (let j = 0; j < path.length; j++) {
      if (i.path[j] !== path[j]) return false
    }
    return true
  })
}