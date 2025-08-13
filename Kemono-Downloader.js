// ==UserScript==
// @name         Kemono Picture Downloader
// @namespace    http://tampermonkey.net/
// @version      2024-12-17
// @description  Add a button to download all pictures in a post.
// @author       TianSalt
// @match        https://*.kemono.cr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kemono.cr
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const url = new URL(window.location.href);
    const isDownloadPage = new RegExp("https://n\\d\\.kemono\\.cr/\\?a=").test(url.href);
    const isImagePage = new RegExp("https://n\\d\\.kemono\\.cr/data/").test(url.href);
    if (!isDownloadPage && !isImagePage) {
        let button = document.createElement("button");
        button.innerText = "⭳";
        button.style.position = "fixed";
        button.style.bottom = "10px";
        button.style.right = "10px";
        button.style.zIndex = "1000";
        button.style.fontSize = "30px";
        button.style.padding = "0px 10px";
        button.style.color = "#e9a17d";
        button.style.backgroundColor = "#1d1f20";
        button.style.border = "2px solid #e9a17d";
        button.style.borderRadius = "4px";
        button.style.transition = "background-color 0.1s, transform 0.1s";
        button.onmouseover = function() { button.style.backgroundColor = "#5c330a"; };
        button.onmouseout = function() { button.style.backgroundColor = "#1d1f20"; };

        button.onclick = function() {
            const imageUrlObjs = Array.from(document.querySelectorAll("a[class='fileThumb image-link']")).map(a => new URL(a.href));
            let arr = [[], [], [], []];
            const len = imageUrlObjs.length;
            if (len === 0) {
                alert("There's no artwork on this page.");
                return;
            }
            for (let i = 0; i < len; i++) {
                const hostname = imageUrlObjs[i].hostname;
                const href = imageUrlObjs[i].href;
                arr[hostname[1] - 1].push(href);
            }
            for (let i = 0; i < 4; i++) {
                if (arr[i].length) {
                    const links = encodeURIComponent(JSON.stringify(arr[i]));
                    setTimeout(() => { window.open(`https://n${i+1}.kemono.cr/?a=${links}`, `_wnd${i}`); }, 0);
                }
            }
        };
        document.body.appendChild(button);

    } else {
        const params = new URLSearchParams(url.search);
        const links = JSON.parse(decodeURIComponent(params.get("a")));
        for (let link of links) {
            let a = document.createElement("a");
            a.href = encodeURI(link);
            a.download = "";
            a.click();
            console.log(a);
        }
        window.close();
    }

})();
