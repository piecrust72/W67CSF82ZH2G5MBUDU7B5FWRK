// sc1.js — put this on GitHub
(function () {
    const repo = 'piecrust72/W67CSF82ZH2G5MBUDU7B5FWRK';
    const localKey = 'sc1_last_commit_info';
    const cached = JSON.parse(localStorage.getItem(localKey) || '{}');

    const sha = cached.sha || 'unknown';
    const nextCheck = cached.timestamp
        ? Math.max(0, Math.ceil((cached.timestamp + 5 * 60 * 1000 - Date.now()) / 1000))
        : 'unknown';

    alert(`🔄 Loaded sc1.js\nHash: ${sha}\nNext check in: ${nextCheck} seconds`);
})();