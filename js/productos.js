const { createApp } = Vue;

createApp({
    data() {
        return {
            productos:[],
            //url:'http://localhost:5000/productos',
            // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
            url:'https://handana.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                })
        },
        eliminar(producto) {
            const url = this.url + '/' + producto;
            let options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                });
        },
        grabar(){
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            };
            let options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.url, options)
                .then(() => {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
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