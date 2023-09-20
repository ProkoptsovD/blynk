function save(key: string, data: unknown): void {
  try {
    const stringifiedData = JSON.stringify(data)

    window.localStorage.setItem(key, stringifiedData)
  } catch (error) {
    console.error('[LOCAL_STORAGE_SAVE] unexpected error')
  }
}

function load<TData>(key: string): TData | null | void {
  try {
    const storedData = window.localStorage.getItem(key)

    if (!storedData) return null

    const parsedData = JSON.parse(storedData)
    return parsedData
  } catch (error) {
    console.error(
      '[LOCAL_STORAGE_LOAD] stored data is malformed - invalid JSON'
    )
  }
}

export const localStorageService = {
  save,
  load
}
