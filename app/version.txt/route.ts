import { appVersion } from '@/lib/version';

// Read at request time: the commit SHA arrives as the runtime env APP_VERSION, not at build time.
export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(appVersion(), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
