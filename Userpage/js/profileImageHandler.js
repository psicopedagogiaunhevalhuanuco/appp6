document.addEventListener('DOMContentLoaded', async function() {
    const img = document.getElementById('profile-img');
    const uploadInput = document.getElementById('upload-img');

    // Solicitar almacenamiento persistente
    const isPersisted = await navigator.storage.persist();
    console.log(`Persistencia de almacenamiento: ${isPersisted ? 'concedida' : 'denegada'}`);

    // Abrir la base de datos IndexedDB
    let db;
    const request = indexedDB.open('profileDB', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore('images', { keyPath: 'id' });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        loadImage();
    };

    request.onerror = function(event) {
        console.error('Database error:', event.target.errorCode);
    };

    // Cargar la imagen guardada al iniciar la página
    function loadImage() {
        const transaction = db.transaction(['images'], 'readonly');
        const objectStore = transaction.objectStore('images');
        const request = objectStore.get('profileImage');

        request.onsuccess = function(event) {
            const result = event.target.result;
            if (result) {
                img.src = result.data;
            } else {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2NjYyIgLz4KICA8cGF0aCBkPSJNMTIuNSAyNSBhMTIuNSAxMi41IDAgMSAxIDI1IDAgMTIuNSAxMi41IDAgMCAxLTI1IDB6bTAgMjVjLTcuNzUgMC0xNSAzLjg3LTE1IDUuNzV2Mi41aDMwdi0yLjVjMC0xLjg4LTcuMjUtNS43NS0xNS01Ljc1eiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+Cg==';
            }
        };
    }

    // Guardar la imagen en IndexedDB
    function saveImage(dataUrl) {
        const transaction = db.transaction(['images'], 'readwrite');
        const objectStore = transaction.objectStore('images');
        const request = objectStore.put({ id: 'profileImage', data: dataUrl });

        request.onsuccess = function(event) {
            console.log('Image saved to IndexedDB');
        };

        request.onerror = function(event) {
            console.error('Error saving image:', event.target.errorCode);
        };
    }

    // Manejar la subida de la imagen
    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                saveImage(e.target.result); // Guardar en IndexedDB
            };
            reader.readAsDataURL(file);
        }
    });
});