export function getEnv(): string {
  return import.meta.env.MODE
}

export function isDev(): boolean {
  return import.meta.env.DEV
}

export function isProd(): boolean {
  return import.meta.env.PROD
}
