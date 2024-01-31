import common from './locales/zh/common.json'
interface resource {
  common: typeof common
}
type ResourceKey = keyof resource
export type LangKeys<T> = T extends ResourceKey ? keyof resource[T] : never
export type LangValues = LangKeys<ResourceKey>
export type ITran = (key: LangValues) => string
