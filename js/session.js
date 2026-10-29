/* A screen owns its timers, listeners and asynchronous cleanup. Works with file://. */
"use strict";
window.KanaSession = {
  create(clock = window) {
    let disposed = false;
    const cleanups = new Set();
    return {
      get disposed() { return disposed; },
      cleanup(fn) { if (disposed) fn(); else cleanups.add(fn); return fn; },
      timeout(fn, ms) {
        const id = clock.setTimeout(() => { cleanups.delete(cancel); if (!disposed) fn(); }, ms);
        const cancel = () => clock.clearTimeout(id); cleanups.add(cancel); return id;
      },
      interval(fn, ms) {
        const id = clock.setInterval(() => { if (!disposed) fn(); }, ms);
        cleanups.add(() => clock.clearInterval(id)); return id;
      },
      listen(target, name, fn, options) {
        target.addEventListener(name, fn, options);
        this.cleanup(() => target.removeEventListener(name, fn, options));
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        cleanups.forEach(fn => { try { fn(); } catch (_) {} }); cleanups.clear();
      }
    };
  }
};
