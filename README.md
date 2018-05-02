
Download with Save As and recent directory
==========================================

Using [chrome.downloads.download](https://developer.chrome.com/extensions/downloads#method-download) with the `saveAs: true` has different results when you do or don’t specify a `filename`.

*   Without a `filename` it defaults to the most recently chosen “Save As” directory
*   With a `filename` it defaults to the downloads directory

Tested on Mac OS 10.13.2, Chrome 66.0.3359.117 (Official Build) (64-bit).
