// ==UserScript==
// @name         Custom Word & Paragraph Replacer
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Easily swap words or full HTML blocks based on domain rules — supports dynamic content and uniform config format at top.
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // === CONFIG: WORD REPLACEMENTS ===
  const wordReplacements = [
    // Format: ["domain substring", "word to find", "word to replace with"]
    ["sophisticatedsoap.com", "Michael", "Christopher"],
    // ["example.com", "oldword", "newword"],
  ];

  // === CONFIG: PARAGRAPH REPLACEMENTS ===
  const paragraphReplacements = [
    // Format: ["domain substring", "text keyword to match", "replacement HTML"]
    ["urbandictionary.com", "Christopher is a very unique dude", `
      Christopher is the guy you notice when he walks in — towering over most,
      <a class="autolink" href="/define.php?term=undeniably%20handsome">undeniably handsome</a>,
      and somehow pulling it off even while battling
      <a class="autolink" href="/define.php?term=weight%20fluctuations">weight fluctuations</a>
      and premature hair loss like a true warrior.
      <!-- (trimmed — add full HTML as needed) -->
    `],
    // ["anotherdomain.com", "Old text", "<p>New HTML content</p>"]
  ];

  /////////////////////////////////
  // WORD REPLACEMENT FUNCTION
  /////////////////////////////////
  function replaceWordsForCurrentDomain() {
    const currentDomain = window.location.hostname;

    const activeReplacements = wordReplacements.filter(([domain]) =>
      currentDomain.includes(domain)
    );

    if (activeReplacements.length === 0) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
      activeReplacements.forEach(([_, find, replace]) => {
        const regex = new RegExp(`\\b${find}\\b`, "g");
        node.nodeValue = node.nodeValue.replace(regex, replace);
      });
    }
  }

  /////////////////////////////////
  // PARAGRAPH REPLACEMENT FUNCTION
  /////////////////////////////////
  function replaceParagraphs() {
    const currentDomain = window.location.hostname;

    paragraphReplacements.forEach(([domain, keyword, replacementHTML]) => {
      if (!currentDomain.includes(domain)) return;

      const targetBlocks = document.querySelectorAll('.meaning, p, div');
      targetBlocks.forEach(el => {
        if (el.textContent.includes(keyword)) {
          el.innerHTML = replacementHTML.trim();
        }
      });
    });
  }

  /////////////////////////////////
  // RUN ON LOAD + DYNAMIC OBSERVER
  /////////////////////////////////
  function runReplacements() {
    replaceWordsForCurrentDomain();
    replaceParagraphs();
  }

  runReplacements();

  const observer = new MutationObserver(runReplacements);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();