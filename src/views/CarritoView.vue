<template>
    <div>
        <h1>Tu carrito de compras</h1>
        <Carrito ref="miCarrito" />
    </div>
</template>

<script>
import Carrito from "../components/Carrito.vue";

export default {
    name: 'CarritoView',
    components: {
        Carrito
    }
}
</script>