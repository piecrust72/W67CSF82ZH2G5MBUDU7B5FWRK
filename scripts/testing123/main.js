(async () => {
    const cache = await GM_getValue('cache_Universal');
    alert(`Hello World!\nVersion: ${cache.version}\n${cache.wasFresh ? 'Fresh download!' : 'From cache.'}`);
    if (cache.wasFresh) {
        cache.wasFresh = false;
        await GM_setValue('cache_Universal', cache);
    }
})();
x
