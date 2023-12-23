import type { Color } from "$lib/types/color"
import { getZodErrorMessage } from "$lib/utils/getZodError"
import { derived, writable } from "svelte/store"
import { z } from "zod"

export const StartBetSizeSchema = z.number().min(10).step(1)
export const ColorToBetSchema = z.enum(["WHITE", "RED", "GREEN", "GOLD"])
export const BetMultiplySizeSchema = z.number().min(1).step(0.01)
export const BalanceBeforeBetSchema = z.number().min(10).step(1)
export const SelectedServerSchema = z.number().step(1).positive()

export const SettingsSchema = z.object({
  startBetSize: StartBetSizeSchema,
  colorToBet: ColorToBetSchema,
  betMultiplySize: BetMultiplySizeSchema,
  balanceBeforeBet: BalanceBeforeBetSchema,
  selectedServer: SelectedServerSchema
})

export type Settings = z.infer<typeof SettingsSchema>

export type SettingsErrors = Record<keyof Settings, string | null>

const initialState: Settings = {
  startBetSize: 10,
  colorToBet: "GREEN",
  betMultiplySize: 2,
  balanceBeforeBet: 10,
  selectedServer: 9
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
    selectedServer: null
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
  const selectedServerError = getZodErrorMessage(result.error.issues, ["selectedServer"])
  if (selectedServerError) {
    errors.selectedServer = selectedServerError.message
  }

  return errors
})
