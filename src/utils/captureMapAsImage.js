import html2canvas from "html2canvas";
import PlaceholderImage from "../assets/map-placeholder.png";

const captureMapAsImage = async (mapContainer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = await html2canvas(mapContainer, {
        useCORS: true,
        allowTaint: true,
      });
      const cropSize = 95; // Crop 95 pixels on all sides so as to remove the white frame added during image capturing
      const width = canvas.width - 2 * cropSize;
      const height = canvas.height - 2 * cropSize;

      // Create a new canvas to hold the cropped image
      const croppedCanvas = document.createElement("canvas");
      const ctx = croppedCanvas.getContext("2d");

      // Sets the size of the new canvas
      croppedCanvas.width = width;
      croppedCanvas.height = height;

      ctx.drawImage(
        canvas,
        cropSize,
        cropSize,
        width,
        height,
        0,
        0,
        width,
        height
      );

      const croppedDataURL = croppedCanvas.toDataURL("image/png");
      resolve(croppedDataURL);
    } catch (err) {
      console.error("Error capturing map as image", err);
      reject(PlaceholderImage);
    }
  });
};

export default captureMapAsImage;
