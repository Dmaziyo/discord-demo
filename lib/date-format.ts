import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { getI18n } from 'react-i18next'

const locales = { zh: zhCN, en: enUS }

export default function dateFormat(date: Date, formatStr = 'PPpp') {
  const { language } = getI18n()
  return format(date, formatStr, {
    locale: locales[language as 'zh' | 'en']
 })
}
