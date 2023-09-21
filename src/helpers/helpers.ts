/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
export const uuid = () => crypto.randomUUID()

/** generates random hex color */
export const generateColor = () => {
  const hexColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${hexColor}`
}

type ClassName = string | boolean | undefined | null

export const cn = (...classNames: Array<ClassName>) => {
  const sanitizedClassNames = classNames.filter(Boolean)

  return sanitizedClassNames.join(' ')
}

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}
