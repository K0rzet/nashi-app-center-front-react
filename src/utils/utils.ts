import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createQueryParams = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    const value = params[key]

    if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val))
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString() ? `?${searchParams.toString()}` : ''
}
