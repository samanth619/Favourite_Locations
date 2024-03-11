import html2canvas from "html2canvas";

const captureMapAsImage = async (mapContainer) => {
  const canvas = await html2canvas(mapContainer, {
    useCORS: true,
    allowTaint: true,
  });
  const cropSize = 80; // Crop 80 pixels on all sides so as to remove the white frame added during image capturing
  const width = canvas.width - 2 * cropSize;
  const height = canvas.height - 2 * cropSize;

  // Create a new canvas to hold the cropped image
  const croppedCanvas = document.createElement("canvas");
  const ctx = croppedCanvas.getContext("2d");

  // Sets the size of the new canvas
  croppedCanvas.width = width;
  croppedCanvas.height = height;

  ctx.drawImage(canvas, cropSize, cropSize, width, height, 0, 0, width, height);

  // Convert the cropped canvas to a data URL
  const croppedDataURL = croppedCanvas.toDataURL("image/png");
  console.log("🚀 ~ captureMapAsImage ~ croppedDataURL:", croppedDataURL);
  return croppedDataURL;
};

export default captureMapAsImage;
