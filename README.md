# Kemono-Downloader

Download all pictures in a [Kemono](https://kemono.su/) artwork page in one button. 一鍵下載 Kemono 作品頁的所有圖片。

Install the code (`Kemono-Downloader.js` in the project folder) via [Tampermonkey](https://github.com/Tampermonkey/tampermonkey), and **allow pop-ups of Kemono** ([Chrome](https://support.google.com/chrome/answer/95472?hl=en&co=GENIE.Platform%3DDesktop) | [Firefox](https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting) | [Edge](https://support.microsoft.com/en-us/microsoft-edge/block-pop-ups-in-microsoft-edge-1d8ba4f8-f385-9a0b-e944-aa47339b6bb5)) **before usage**. 使用油猴安裝，使用需**允許 Kemono 彈窗**。

Once installed, you can find a button at the right-bottom corner in every new Kemono artwork page. 下載按鈕將出現在頁面右下角。

## Procedure

Select all pictures by the pattern:

```JavaScript
document.querySelectorAll("a[class='fileThumb image-link']")
```

Pictures of kemono are saved in `https://n[1|2|3|4].kemono.su/?a=[link]`, but browsers nowadays don't allow cross-origin picture downloading (the pictures will just be opened in new tabs), so we need to download in pop-ups using `window.open` (that's why you need to allow pop-ups).
