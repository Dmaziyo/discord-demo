export function getNamespaces() {
  return ['common']
}

export function getOptions(locale: string, namespaces?: string[]) {
  const ns = namespaces !== undefined ? namespaces : getNamespaces()
  return {
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: ns[0],
    fallbackNS: ns[0],
    ns,
    preload: typeof window === 'undefined' ? i18nConfig.locales : []
  }
}

const i18nConfig = {
  defaultLocale: 'en',
  locales: ['zh', 'en']
}
export default i18nConfig
