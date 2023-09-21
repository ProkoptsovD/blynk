const acceptedRules = ['required'] as const

type RulesKeys = (typeof acceptedRules)[number]

export type ValidationRules<TValues> = Record<
  keyof TValues,
  Record<RulesKeys, string | boolean>
>

export const validate = <TValues extends Record<string, unknown>>(
  object: TValues,
  rules: ValidationRules<TValues>
) => {
  const errors = Object.entries(rules).reduce((acc, [ruleKey, rule]) => {
    const valueToCheck = object[ruleKey]

    if (!rule) return acc

    const { required } = rule

    if (required && !valueToCheck) {
      const isBoolean = typeof required === 'boolean'

      return {
        ...acc,
        [ruleKey]: isBoolean ? 'Field is required' : required
      }
    }

    return acc
  }, {} as Record<keyof TValues, unknown>)

  const hasErrors = Object.keys(errors).length > 0

  return hasErrors ? errors : null
}
