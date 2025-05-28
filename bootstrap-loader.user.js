// ==UserScript==
// @name         Remote Script Loader (Smart Cache)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Loads main.js from GitHub only if version changes
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    const versionUrl = "https://raw.githubusercontent.com/piecrust72/W67CSF82ZH2G5MBUDU7B5FWRK/refs/heads/main/version.txt";
    const scriptUrl = "https://raw.githubusercontent.com/piecrust72/W67CSF82ZH2G5MBUDU7B5FWRK/refs/heads/main/main.js";

    const cacheKey = "remoteScriptCache";
    const versionKey = "remoteScriptVersion";

    function fetchText(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url,
            onload: res => callback(res.responseText),
        });
    }

    function runScript(code) {
        try {
            eval(code);
        } catch (e) {
            console.error("Error evaluating remote script:", e);
        }
    }

    function updateScript(newVersion) {
        fetchText(scriptUrl, code => {
            GM_setValue(cacheKey, code);
            GM_setValue(versionKey, newVersion);
            runScript(code);
        });
    }

    fetchText(versionUrl, latestVersion => {
        const cachedVersion = GM_getValue(versionKey, "");
        if (latestVersion.trim() !== cachedVersion) {
            updateScript(latestVersion.trim());
        } else {
            const cached = GM_getValue(cacheKey, "");
            if (cached) runScript(cached);
        }
    });
})();
