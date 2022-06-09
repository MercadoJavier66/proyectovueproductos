<template>
    <div>

        <div>
            <div class="m-4">
                <ol class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(prod, i) in productos" :key="i">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold" style="text-align: left;">{{prod.titulo}}</div>
                            {{prod.descripcion}}
                            <div style="text-align: left;">
                                Precio unitario: $ {{prod.precio}}
                            </div>
                        </div>
                        <span class="badge bg-primary rounded-pill">{{prod.cantidad}}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Total</div>
                            $ {{totalAPagar}}
                        </div>
                    </li>
                </ol>
            </div>
            <br>
            <button class="btn btn-success" @click="confirmarCompra">Confirmar compra</button>
        </div>
    </div>
</template>

<script>

/**
 * importo axios
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


export default {
    name: "Carrito",
    data() {
        return {
            productos: []
        };
    },
    computed: {
        cantidadProductosCarrito(){
            let total = 0
            this.productos.forEach(e => {
                total += e.cantidad
            })
            return total
        },
        totalAPagar(){
            let total = 0
            this.productos.forEach(e => {
                total += e.cantidad * e.precio
            })
            return total
        }
    },
    methods: {
        async confirmarCompra(){
            const usuario = JSON.parse(localStorage.getItem('usuario'))
            console.log(this.totalAPagar)
            if (this.totalAPagar == 0){
                alert('No tiene productos')
                return 
            }

            const pedido = await Vue.axios({
                method: 'post',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/pedidos',
                data:  
                {
                    "idUsuario": usuario.id,
                    "numFactura": Math.floor(Math.random() * (2000 - 1000)) + 1000,
                    "total": this.totalAPagar,
                }
            });

            console.log(pedido)
            /*
            data:
            createdAt: "2022-06-08T11:23:49.645Z"
            id: "1"
            idUsuario: "2"
            numFactura: 1403
            total: 234903
            */

            let productosApi = await Vue.axios.get('https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos')
            productosApi = productosApi.data

            for await (const prodDelCarrito of this.$store.state.productosDelCarrito) {
                const productoAEditar = productosApi.find(p => p.id == prodDelCarrito.id)
                productoAEditar.cantidad = productoAEditar.cantidad - prodDelCarrito.cantidad
                await Vue.axios({
                    method: 'put',
                    url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos/'+productoAEditar.id,
                    data:  
                    {
                        "cantidad": productoAEditar.cantidad,
                    }
                });

                const detalle = await Vue.axios({
                    method: 'post',
                    url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/detallesp',
                    data:  
                    {
                        "idPedido": pedido.data.id,
                        "idProducto": prodDelCarrito.id,
                        "cantidad": prodDelCarrito.cantidad,
                        "total": prodDelCarrito.cantidad * prodDelCarrito.precio,
                    }
                });

            }

            console.log('listo')
            this.productos = []
            this.$store.state.productosDelCarrito = []
        }
    },
    created(){
        this.productos = this.$store.state.productosDelCarrito
    },

}
    </script>


<style scoped>

</style>
