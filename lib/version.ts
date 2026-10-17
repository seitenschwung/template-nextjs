export function appVersion(env: Record<string, string | undefined> = process.env): string {
  return env.APP_VERSION ?? 'dev';
}
