<template>
    <div class="col-6 col-sm-3">
        <div class="card" style="width: 18rem;">
            <img :src="nombreImagen" class="card-img-top" alt="...">
            <div class="card-body" style="height: 15rem;">
                <h5 class="card-title">{{ titulo }}</h5>
                <p class="card-text recorte-texto">{{ descripcion }}</p>
                <p class="card-text">${{ precio }}</p>
                <p class="card-text">Stock: {{ cantidad }}</p>
                <button class="btn btn-primary" @click="agregarAlCarrito">Agregar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Producto",
    props: {
        titulo: {
            type: String,
            required: true,
        },
        nombreImagen: {
            type: String,
            required: true,
        },
        precio: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
    },
    

    methods: {
        agregarAlCarrito() {
            // descontamos la cantidad de nuestro stock
            const productoEnCarrito = this.$store.state.productosDelCarrito.find(p => p.id == this.id)

            if (productoEnCarrito != undefined){ // si existe en el carrito
                productoEnCarrito.cantidad++
            }else{ // si no existe en el carrito
                const productoNuevoEnCarrito = {
                    id: this.id,
                    titulo: this.titulo,
                    nombreImagen: this.nombreImagen,
                    precio: this.precio,
                    descripcion: this.descripcion,
                    cantidad: 1,
                }
                this.$store.state.productosDelCarrito.push(productoNuevoEnCarrito)
            }
            // descontamos el stock del store ... PENDIENTE DE SABER SI ACTUALIZAMOS EN EL MOCKAPI
            const productoAActualizar = this.$store.state.listaTotalProductos.find(p => p.id == this.id)
            productoAActualizar.cantidad--
            
        },
    },
};
</script>

<style>
    .recorte-texto {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
