import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApiUrl, API_BASE } from './api.js';

test('buildApiUrl prefixes the API root', () => {
  assert.equal(buildApiUrl('/auth/login'), `${API_BASE}/api/auth/login`);
});
