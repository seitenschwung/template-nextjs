import { describe, expect, it } from 'vitest';

import { appVersion } from './version';

describe('appVersion', () => {
  it('reads APP_VERSION', () => {
    expect(appVersion({ APP_VERSION: 'abc123' })).toBe('abc123');
  });
  it('falls back to dev', () => {
    expect(appVersion({})).toBe('dev');
  });
});
