import { ITran } from '@/app/i18n/type'
import { i18n } from 'i18next'
import { usePathname, useRouter } from 'next/navigation'
import { getI18n, useTranslation } from 'react-i18next'

export function useClientTranslation() {
  const { t, i18n } = useTranslation()
  return { t, i18n } as { t: ITran; i18n: i18n }
}

export function useChangeLanguage() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathName = usePathname()

  const handleChange = (newLocale: string) => {
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    window.location.href = currentPathName.replace(`/${currentLocale}`, `/${newLocale}`)
  }

  return { currentLocale, handleChange }
}

// 在非组件中引用
export function getTranslationWithoutReact() {
  const { t } = getI18n()
  return t as ITran
}
