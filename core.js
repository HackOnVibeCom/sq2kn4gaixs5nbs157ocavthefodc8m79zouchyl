(() => {
  const DEMO_MS = 45_000;
  const REAL_MS = 48 * 60 * 60 * 1000;

  function createBuffer(fields, options = {}) {
    const now = options.now ?? Date.now();
    const demo = Boolean(options.demo);
    return {
      id: fields.id || `buffer-${now}`,
      item: String(fields.item || '').trim(),
      price: Number(fields.price),
      link: String(fields.link || '').trim(),
      owner: String(fields.owner || 'You').trim() || 'You',
      createdAt: now,
      endsAt: now + (demo ? DEMO_MS : REAL_MS),
      demo,
      invitedBy: options.invitedBy || null,
    };
  }

  function state(buffer, now = Date.now()) {
    return buffer.decision || (now >= buffer.endsAt ? 'due' : 'cooling');
  }

  function remaining(buffer, now = Date.now()) {
    return Math.max(0, buffer.endsAt - now);
  }

  function inviteUrl(base, buffer) {
    const payload = {
      id: buffer.id,
      item: buffer.item,
      price: buffer.price,
      owner: buffer.owner,
      endsAt: buffer.endsAt,
    };
    const url = new URL(base);
    url.hash = `buddy=${encodeURIComponent(JSON.stringify(payload))}`;
    return url.toString();
  }

  function readBuddyHash(hash) {
    if (!hash || !hash.startsWith('#buddy=')) return null;
    try {
      const payload = JSON.parse(decodeURIComponent(hash.slice(7)));
      if (!payload.id || !payload.item || !payload.owner) return null;
      return payload;
    } catch {
      return null;
    }
  }

  function stats(buffers, metrics = {}) {
    const decided = buffers.filter(b => ['buy', 'skip'].includes(b.decision));
    const skipped = decided.filter(b => b.decision === 'skip').length;
    return {
      buffersCreated: buffers.length,
      invitesSent: metrics.invitesSent || 0,
      invitesOpened: metrics.invitesOpened || 0,
      reciprocalStarts: metrics.reciprocalStarts || 0,
      skipped,
      decisions: decided.length,
      skipPercent: decided.length ? Math.round(skipped / decided.length * 100) : 0,
    };
  }

  const api = { DEMO_MS, REAL_MS, createBuffer, state, remaining, inviteUrl, readBuddyHash, stats };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof globalThis !== 'undefined') globalThis.BufferCore = api;
})();
