const fileInput = document.getElementById('input-file');
const triggerButton = document.getElementById('trigger-btn');
const fileNameDisplay = document.getElementById('file-name');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    triggerButton.addEventListener(eventName, (e) => e.preventDefault());
    triggerButton.addEventListener(eventName, (e) => e.stopPropagation());
});

triggerButton.addEventListener('dragenter', () => {
    triggerButton.classList.add('drag-over');
});

triggerButton.addEventListener('dragover', () => {
    triggerButton.classList.add('drag-over');
});

triggerButton.addEventListener('dragleave', () => {
    triggerButton.classList.remove('drag-over');
});

triggerButton.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileNameDisplay.textContent = files[0].name;
    }
    triggerButton.classList.remove('drag-over');
});

triggerButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
});

document.getElementById("convert-btn").addEventListener("click", () => {
    const inputFile = document.getElementById("input-file");
    const file = inputFile.files[0];

    if(!file){
        alert("daj tam png file");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event){
        const img = new Image();
        img.onload = function (){
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const link = canvas.toDataURL("image/jpg");

            const outputImage = document.createElement("img");
            outputImage.src = link;

            const originalFileName = file.name.split('.').slice(0, -1).join('.');
            const newFileName = `${originalFileName}.jpg`;

            console.log("Image converted");

            const download = document.getElementById("download");
            download.href = link;
            download.download = newFileName;

            outputImage.innerHTML = '';
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});