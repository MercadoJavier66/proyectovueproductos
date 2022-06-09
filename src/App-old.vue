<template>
    <div id="app" class="container">
        <router-view/>
        <!-- <Titulo></Titulo>

        <Registro></Registro>
        <br>
        <Login></Login>
        <br>
         <Carrito
            ref="miCarrito"

        />

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
        <Admin-productos></Admin-productos> -->
    </div>
</template>

<script>





import Titulo from "./components/Titulo.vue";
import Producto from "./components/Producto.vue";
import Carrito from "./components/Carrito.vue";
import Login from "./components/Login.vue";
import Registro from './components/Registro.vue';
import AdminProductos from './components/adminProductos.vue';
/**
 * importo axios
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    name: "App",
    props: [],
    components: {
        Carrito, Producto, Titulo, Login,
        Registro,
        AdminProductos
    },

    data() {
        return {
            productos: [

            ],
        };
    },
    methods: {
        AgregarAlCarrito(id) {
            let result = this.productos.find(prod => prod.id == id);

            if (result) {
                this.$refs.miCarrito.AgregarProducto(result);
            }
        },
        async getProductos(){
            const productos = await Vue.axios.get('https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos')
            return productos
        }

    },
    created: async function(){
        const productos = await this.getProductos()
        this.productos = productos.data
     },
};
</script>

<style>
body {
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #111;
}

</style>
