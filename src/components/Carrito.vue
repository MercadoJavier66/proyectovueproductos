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
        </div>
    </div>
</template>

<script>


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
        
    },
    created(){
        this.productos = this.$store.state.productosDelCarrito
    },

}
    </script>


<style scoped>

</style>
