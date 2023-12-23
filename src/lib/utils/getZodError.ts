export const getZodErrorMessage = (issues: Zod.ZodIssue[], path: (string | number)[]) => {
  return issues.find(i => {
    if (i.path.length !== path.length) return false
    for (let j = 0; j < path.length; j++) {
      if (i.path[j] !== path[j]) return false
    }
    return true
  })
}