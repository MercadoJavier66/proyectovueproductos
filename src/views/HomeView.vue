<template>
	<div class="home">
		<h1>Productos de nuestra tienda</h1>
		<div class="row mt-4">
            <Producto
                v-for="(item, i) in $store.state.listaTotalProductos"
                :key="i"
                :id="item.id"
                :titulo="item.titulo"
                :descripcion="item.descripcion"
                :precio="item.precio"
                :nombre-imagen="item.nombreImagen"
                :cantidad="Number(item.cantidad)"
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
            
        };
    },
	methods: {
		async getProductos(){
            const productos = await Vue.axios.get('https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos')
            return productos
        },
	},
	created: async function(){
        const productos = await this.getProductos()
        this.$store.state.listaTotalProductos = productos.data
	},
};
</script>
