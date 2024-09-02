function makeQRCode() {
    let urlInput = document.getElementById("input-url");
    let inputValue = urlInput.value.trim();

    document.getElementById("appearQR").innerHTML = "";

        if (inputValue) {
            new QRCode(document.getElementById("appearQR"), {
            text: inputValue,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
        setTimeout(() => {
            let qrCanvas = document.querySelector("#appearQR canvas");

            if (qrCanvas) {
                let dataUrl = qrCanvas.toDataURL("image/png");

                let downloadLink = document.getElementById("btn-download");
                downloadLink.href = dataUrl;
                downloadLink.download = "QRCode.png";
            }
        }, 300);
    } else {
        alert("Please enter a valid URL.");
    }
}