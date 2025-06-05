// ==UserScript==
// @name          CDN
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Done
// @author       You
// @match        https://www.sweeeepluxe.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const CSV_URL = 'https://raw.githubusercontent.com/piecrust72/W67CSF82ZH2G5MBUDU7B5FWRK/refs/heads/main/Rad.csv';

    async function fetchCSV(url) {
        const res = await fetch(url);
        const text = await res.text();
        return parseCSV(text);
    }

    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const imageUrls = [];

        for (let i = 1; i < lines.length; i++) {
            const cells = lines[i].split(',').map(c => c.trim());
            const obj = {};
            headers.forEach((header, idx) => obj[header] = cells[idx]);
            if (obj['Image URL']) {
                imageUrls.push(obj['Image URL']);
            }
        }
        return imageUrls;
    }

    function replaceCDNUrls(imageUrls) {
        const usedUrls = new Set();

        function getRandomUrl() {
            const available = imageUrls.filter(url => !usedUrls.has(url));
            if (available.length === 0) {
                // All used, allow reuse
                usedUrls.clear();
                return getRandomUrl();
            }
            const randomUrl = available[Math.floor(Math.random() * available.length)];
            usedUrls.add(randomUrl);
            return randomUrl;
        }

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                    if (mutation.target.src.includes('cdn.sweepluxe.com')) {
                        mutation.target.src = getRandomUrl();
                    }
                }
            });
        });

        const scanAndReplace = () => {
            const allElements = document.querySelectorAll('[src*="cdn.sweepluxe.com"]');
            allElements.forEach(el => {
                el.src = getRandomUrl();
                observer.observe(el, { attributes: true });
            });
        };

        // Initial scan
        scanAndReplace();

        // Also re-scan after any DOM changes (for dynamically loaded content)
        const bodyObserver = new MutationObserver(() => scanAndReplace());
        bodyObserver.observe(document.body, { childList: true, subtree: true });
    }

    (async function init() {
        try {
            const imageUrls = await fetchCSV(CSV_URL);
            if (imageUrls.length === 0) return;
            replaceCDNUrls(imageUrls);
        } catch (err) {
            console.error('Error loading or parsing CSV:', err);
        }
    })();
})();
