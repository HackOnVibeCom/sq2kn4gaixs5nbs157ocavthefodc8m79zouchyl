const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../core.js');

test('timer changes from cooling to due using the stored end timestamp', () => {
  const buffer = core.createBuffer({ id: 'a', item: 'Lamp', price: 20 }, { now: 1000 });
  assert.equal(core.state(buffer, 1000), 'cooling');
  assert.equal(core.state(buffer, buffer.endsAt), 'due');
  assert.equal(core.remaining(buffer, buffer.endsAt + 100), 0);
});

test('demo timer is 45 seconds and the real timer is 48 hours', () => {
  const demo = core.createBuffer({ item: 'Demo', price: 1 }, { now: 5000, demo: true });
  const real = core.createBuffer({ item: 'Real', price: 1 }, { now: 5000 });
  assert.equal(demo.endsAt - demo.createdAt, 45_000);
  assert.equal(real.endsAt - real.createdAt, 48 * 60 * 60 * 1000);
});

test('buddy link round-trips the card data without a server', () => {
  const buffer = core.createBuffer({ id: 'b1', item: 'Headphones', price: 129, owner: 'Alex' }, { now: 100 });
  const link = core.inviteUrl('https://example.test/?demo=1', buffer);
  const payload = core.readBuddyHash(new URL(link).hash);
  assert.equal(payload.id, 'b1');
  assert.equal(payload.item, 'Headphones');
  assert.equal(payload.owner, 'Alex');
  assert.equal(core.readBuddyHash('#buddy=not-json'), null);
});

test('stats count skip rate from completed decisions only', () => {
  const result = core.stats([{ decision: 'skip' }, { decision: 'buy' }, {}, { decision: 'skip' }], {
    invitesSent: 3, invitesOpened: 2, reciprocalStarts: 1,
  });
  assert.deepEqual(result, {
    buffersCreated: 4, invitesSent: 3, invitesOpened: 2, reciprocalStarts: 1,
    skipped: 2, decisions: 3, skipPercent: 67,
  });
});
