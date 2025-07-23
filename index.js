$(document).ready(function () {
  const urlInput = $("#url");
  const qrForm = $("#qrForm");
  const qrDisplay = $("#qrDisplay");
  const downloadQrButton = $("#downloadQr");
  const messageDiv = $("#message");
  const qrCodeCanvas = $("#qr-code")[0];

  let qr = null;

  function showMessage(msg, type) {
    messageDiv.text(msg).attr("class", `message ${type}`).show();
  }

  function hideMessage() {
    messageDiv.hide();
  }

  qrForm.on("submit", function (e) {
    e.preventDefault();
    hideMessage();

    const url = urlInput.val().trim();

    if (!url) {
      showMessage("Please enter a URL", "error");
      qrDisplay.hide();
      return;
    }

    if (qr) {
      qr.value = url;
    } else {
      qr = new QRious({
        element: qrCodeCanvas,
        value: url,
        size: 250,
        level: "M",
        padding: 15,
      });
    }

    qrDisplay.css("display", "flex"); // Use .css() for display: flex
  });

  downloadQrButton.on("click", function () {
    try {
      const dataURL = qrCodeCanvas.toDataURL("image/png");

      const link = $("<a>")
        .attr("download", "qr-code.png")
        .attr("href", dataURL);

      $("body").append(link);
      link[0].click();
      link.remove();

      showMessage("✅ QR code saved as qr-code.png", "success");
    } catch (error) {
      showMessage("❌ Something went wrong.", "error");
      console.error(error);
    }
  });
});
