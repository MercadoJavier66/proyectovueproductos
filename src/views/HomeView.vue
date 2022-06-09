<template>
	<div class="home">
		<h1>Productos de nuestra tienda</h1>
		<div class="row mt-4">
            <Producto
                v-for="(item, i) in productos"
                :key="i"
                :id="item.id"
                :titulo="item.titulo"
                :descripcion="item.descripcion"
                :precio="item.precio"
                :nombre-imagen="item.nombreImagen"
                :cantidad="item.cantidad"
                @agregar-al-carrito="AgregarAlCarrito"
            >
            </Producto>
        </div>
	</div>
</template>

<script>
// @ is an alias to /src
import Producto from "@/components/Producto.vue";

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
	name: "HomeView",
	components: {
		Producto,
	},
	data() {
        return {
            productos: [],
        };
    },
	methods: {
		async getProductos(){
            const productos = await Vue.axios.get('https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos')
            return productos
        },
        AgregarAlCarrito(id) {
            let result = this.productos.find(prod => prod.id == id);

            if (result) {
                this.$refs.miCarrito.AgregarProducto(result);
            }
        },
	},
	created: async function(){
        const productos = await this.getProductos()
        this.productos = productos.data
	},
};
</script>
