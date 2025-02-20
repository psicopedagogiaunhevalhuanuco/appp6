// Script para manejar la subida de la imagen y guardarla en el sistema de archivos
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('profile-img');
    const uploadInput = document.getElementById('upload-img');

    // Cargar la imagen guardada al iniciar la página
    function loadImage() {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            img.src = storedImage;
        } else {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2NjYyIgLz4KICA8cGF0aCBkPSJNMTIuNSAyNSBhMTIuNSAxMi41IDAgMSAxIDI1IDAgMTIuNSAxMi41IDAgMCAxLTI1IDB6bTAgMjVjLTcuNzUgMC0xNSAzLjg3LTE1IDUuNzV2Mi41aDMwdi0yLjVjMC0xLjg4LTcuMjUtNS43NS0xNS01Ljc1eiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+Cg==';
        }
    }

    // Guardar la imagen en el sistema de archivos
    async function saveImage(file) {
        try {
            const newHandle = await window.showSaveFilePicker({
                suggestedName: 'profile-image.png',
                types: [{
                    description: 'Images',
                    accept: {'image/*': ['.png', '.gif', '.jpeg', '.jpg']}
                }]
            });
            const writableStream = await newHandle.createWritable();
            await writableStream.write(await file.arrayBuffer());
            await writableStream.close();
        } catch (error) {
            console.log('Image not saved');
        }
    }

    // Manejar la subida de la imagen
    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result); // Guardar en localStorage
                saveImage(file);
            };
            reader.readAsDataURL(file);
        }
    });

    // Cargar la imagen guardada al iniciar la página
    loadImage();
});