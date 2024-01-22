import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'
import i18nConfig from '@/app/i18n/i18nConfig'

import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  beforeAuth: req => {
    if (!req.url.includes('socket')) {
      return intlMiddleWare(req)
    }
  },
  publicRoutes: ['/api/uploadthing']
})

export function intlMiddleWare(request: NextRequest) {
  return i18nRouter(request, i18nConfig)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
