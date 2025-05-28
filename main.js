// ==UserScript==
// @name         Hello World Script
// @namespace    http://tampermonkey.net/
// @version      %%VERSION%%
// @description  Displays a welcome alert with the current version
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    alert("Hello World! Welcome to %%VERSION%%");
})();
