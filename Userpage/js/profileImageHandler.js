// Script para manejar la subida de la imagen y guardarla en el sistema de archivos
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('profile-img');
    const uploadInput = document.getElementById('upload-img');

    // Cargar la imagen guardada al iniciar la página
    async function loadImage() {
        try {
            const fileHandle = await window.showOpenFilePicker({
                types: [{
                    description: 'Images',
                    accept: {'image/*': ['.png', '.gif', '.jpeg', '.jpg']}
                }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            const file = await fileHandle[0].getFile();
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log('No image loaded');
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
            await writableStream.write(file);
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
                saveImage(file);
            };
            reader.readAsDataURL(file);
        }
    });

    // Cargar la imagen guardada al iniciar la página
    loadImage();
});