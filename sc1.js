(function () {
    const localKey = 'sc1_last_commit_info';
    const refreshInterval = 60 * 1000; // 60 seconds

    const cached = JSON.parse(localStorage.getItem(localKey) || '{}');
    const now = Date.now();

    const sha = cached.sha || 'unknown';
    const timestamp = cached.timestamp || 0;

    const timeUntilNextCheck = Math.max(0, Math.ceil((timestamp + refreshInterval - now) / 1000));
    const timeSinceLastFresh = Math.max(0, Math.floor((now - timestamp) / 1000));

    // Create a styled popup
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="
            position:fixed;
            bottom:20px;
            right:20px;
            background:#222;
            color:#fff;
            font-family:sans-serif;
            padding:12px 16px;
            border-radius:8px;
            box-shadow:0 4px 12px rgba(0,0,0,0.3);
            z-index:999999;
            font-size:14px;
        ">
            🔁 <strong>sc1.js Loaded</strong><br>
            SHA: <code>${sha}</code><br>
            ⏳ Next check in: <strong>${timeUntilNextCheck}</strong>s<br>
            🕒 Last fresh load: <strong>${timeSinceLastFresh}</strong>s ago
        </div>
    `;
    document.body.appendChild(popup);

    // Auto-hide after 10 seconds
    setTimeout(() => popup.remove(), 10000);
})();