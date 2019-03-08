const IMAGE_URL = chrome.extension.getURL("/image.png");

const main = () => {
  let buttons = Array.prototype.slice.call(
    document.getElementsByClassName("dl")
  );

  buttons.forEach(button => {
    button.addEventListener(
      "click",
      () => {
        // NOTE - load image as blob first, a recent
        // Chrome update was causing "Failed - Network
        // Error" when trying to download image url directly
        imageAsBlobProm(IMAGE_URL)
          .then(url => {
            // 1. Download configuration
            let opts = {
              url: url,
              saveAs: true
            };

            // 2. Specify a filename for "Download with
            //    a filename" button
            if (button.id === "dl-name") {
              opts.filename = "image-named.png";
            }

            // 3. Perform the download
            chrome.downloads.download(opts, downloadId => {
              console.log("downloaded", downloadId);
            });
          })
          .catch(err => console.error(err));
      },
      false
    );
  });
};

//

const imageAsBlobProm = src =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const { width, height } = image;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      canvas.toBlob(blob => {
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      });
    };
    image.onerror = err => reject(err);
    image.src = src;
  });

//

main();
