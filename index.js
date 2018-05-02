let buttons = Array.prototype.slice.call(document.getElementsByClassName("dl"));

buttons.forEach(button => {
  button.addEventListener(
    "click",
    () => {
      let opts = {
        url: chrome.extension.getURL("/image.png"),
        saveAs: true
      };
      if (button.id === "dl-name") {
        opts.filename = "image-named.png";
      }
      chrome.downloads.download(opts, downloadId => {
        console.log("downloaded", downloadId);
      });
    },
    false
  );
});
