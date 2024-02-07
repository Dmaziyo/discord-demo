import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function throttle(fn: Function, delay: number) {
  let startTime = Date.now()
  return function (...args: any) {
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime)
    if (remaining <= 0) {
      fn(...args)
      startTime = Date.now()
    } else {
      setTimeout(() => {
        fn(...args)
      }, remaining)
    }
  }
}
export function debounce(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: any) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
