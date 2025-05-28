// ==UserScript==
// @name         Unified Script Loader
// @namespace    http://example.com/
// @version      1.0
// @description  Loads the correct script for each site with versioning and cache
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(async function () {
    const repoBase = 'https://raw.githubusercontent.com/piecrust72/W67CSF82ZH2G5MBUDU7B5FWRK/main/scripts';

    const scriptMap = {
        'youtube.com': 'YouTube',
        'www.youtube.com': 'YouTube',
        'example.com': 'HiddenAds'
    };

    const folder = scriptMap[location.hostname] || 'Universal';
    const cacheKey = `cache_${folder}`;

    const versionUrl = `${repoBase}/${folder}/version.txt`;
    const scriptUrl = `${repoBase}/${folder}/main.js`;

    const forceUpdate = location.href.includes('forceUpdate');
    const cache = await GM_getValue(cacheKey, null);

    let remoteVersion = null;
    try {
        remoteVersion = await fetch(versionUrl).then(r => r.text());
    } catch (e) {
        console.warn("Couldn't fetch remote version:", e);
    }

    const shouldUpdate = !cache || forceUpdate || (remoteVersion && cache.version !== remoteVersion);

    if (shouldUpdate) {
        try {
            const code = await fetch(scriptUrl).then(r => r.text());
            await GM_setValue(cacheKey, {
                code,
                version: remoteVersion || 'unknown',
                wasFresh: true
            });
            eval(code);
            return;
        } catch (e) {
            console.error("Error downloading new script:", e);
        }
    }

    if (cache?.code) {
        eval(cache.code);
    } else {
        console.warn("No cached script available and failed to load remote.");
    }
})();
