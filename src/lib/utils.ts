import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isDev = (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_NODE_ENV === 'development')


const noop = () => null
export const logger = {

  debug: isDev ? console.debug.bind(console, "[DEBUG]") : noop,
  log: isDev ? console.log.bind(console, "[log]") : noop,
  trace: isDev ? console.trace.bind(console, "[trace]") : noop,
  info: isDev ? console.info.bind(console, "[info]") : noop,
  error: isDev ? console.error.bind(console, "[error]") : noop,
  warn: isDev ? console.warn.bind(console, "[warn]") : noop,
  dir: isDev ? console.dir.bind(console, "[dir]") : noop


}
