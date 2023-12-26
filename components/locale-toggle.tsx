'use client'

import * as React from 'react'
import { Languages } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useChangeLanguage } from '@/hooks/use-i18n'

export function LocaleToggle() {
  const { handleChange } = useChangeLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent border-none">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('zh')}>中文</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
