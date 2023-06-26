// input = requestObject , arrayofProperties
// output = an object having the requestObject's properties
// 1

export const mapReqQuerysProperty = <T extends object, k extends keyof T>(
  reqObject: T,
  keys: k[]
): Partial<T> => {
  const objectFromQuerys: Partial<T> = {}
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (reqObject && reqObject.hasOwnProperty(key)) {
      objectFromQuerys[key] = reqObject[key]
    }
  }
  return objectFromQuerys
}
