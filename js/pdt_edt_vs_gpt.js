console.log(location.search);
let id = location.search.substr(4);
console.log(id);

const { createApp } = Vue;
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            url: 'https://handana.pythonanywhere.com/productos/' + id,
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            };
            let options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(this.url, options)
                .then(() => {
                    alert("Registro modificado");
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar");
                });
        },
        cargarImagen(event) {
            const file = event.target.files[0];

            if (file) {
                // Convierte la imagen a un formato de URL legible por el navegador
                this.imagen = URL.createObjectURL(file);
            }
        }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');

