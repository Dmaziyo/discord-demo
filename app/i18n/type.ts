import common from './locales/zh/common.json'
interface resource {
  common: typeof common
}
type ResourceKey = keyof resource
export type LangKeys<T> = T extends ResourceKey ? keyof resource[T] : never
export type ITran = (key: LangKeys<ResourceKey>) => string
