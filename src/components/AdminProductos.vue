<template>
    <div>
        <h1>Lista de Productos</h1>
        <button class="btn btn-success" @click="mostrarModalAgregar">Agregar nuevo</button>
        <table class="table table-success table-striped">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">descripcion</th>
                <th scope="col">Imagen</th>
                <th scope="col">Precio</th>
                <th scope="col">cantidad</th>
                <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(prod, indice) in productos" :key="indice">
                    <th scope="row">{{prod.id}}</th>
                    <td>{{prod.titulo}}</td>
                    <td>{{prod.descripcion}}</td>
                    <td> <img :src="prod.nombreImagen" :alt="prod.nombreImagen" style="width: 150px;"></td>
                    <td>{{prod.precio}}</td>
                    <td>{{prod.cantidad}}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" @click="modalEditarFunc(prod.id)">Modificar</button>
                        <button type="button" class="btn btn-outline-danger" @click="eliminarProducto(prod.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Vista editar  -->
        <div class="modal" tabindex="-1" id="modalEditar" style="background-color: rgba(0, 0, 0, .4);">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar producto</h5>
                </div>
                <div class="modal-body">
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Título</label>
                        <input type="text" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="titulo">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="descripcion">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="precio">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Cantidad</label>
                        <input type="number" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="cantidad">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="modifProducto">Guardar cambios</button>
                </div>
                </div>
            </div>
        </div>





        <div class="modal" tabindex="-1" id="modalAgregar" style="background-color: rgba(0, 0, 0, .4);">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar producto</h5>
                </div>
                <div class="modal-body">
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Título</label>
                        <input type="text" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="titulo">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="descripcion">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="precio">
                    </div>
                    
                    <div class="mb-3">
                        <label for="txtTitulo" class="form-label">Cantidad</label>
                        <input type="number" class="form-control" id="txtTitulo" aria-describedby="emailHelp" v-model="cantidad">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="nuevoProducto">Guardar cambios</button>
                </div>
                </div>
            </div>
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
    name: 'adminProductos',
    data(){
        return {
            productos: [],
            titulo: null,
            descripcion: null,
            precio: null,
            cantidad: null,
            modificandoID: null
        }
    },
    methods:{
        async getProductos(){
            const productos = await Vue.axios({
                method: 'get',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos',
            });
            this.productos = productos.data
        },
        async modifProducto(){
            const prod = await Vue.axios({
                method: 'put',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos/'+this.modificandoID,
                data:  
                {
                    "titulo": this.titulo,
                    "descripcion": this.descripcion,
                    "precio": this.precio,
                    "cantidad": this.cantidad,
                }
            });
            this.titulo = null
            this.descripcion = null
            this.precio = null
            this.cantidad = null

            await this.getProductos()
            this.cerrarModal()
        },
        async modalEditarFunc(id){
            this.modificandoID = id
            const producto = await Vue.axios({
                method: 'get',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos/'+id,
            });
            this.titulo = producto.data.titulo
            this.descripcion = producto.data.descripcion
            this.precio = producto.data.precio
            this.cantidad = producto.data.cantidad

            document.getElementById('modalEditar').style.display = 'block'
        },
        cerrarModal(){
            document.getElementById('modalEditar').style.display = 'none'
            document.getElementById('modalAgregar').style.display = 'none'
        },
        mostrarModalAgregar(){
            document.getElementById('modalAgregar').style.display = 'block'
        },
        async eliminarProducto(id){
            await Vue.axios({
                method: 'delete',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos/'+id,
            });
            await this.getProductos()
        },

        async nuevoProducto(){
            const prod = await Vue.axios({
                method: 'post',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/productos',
                data:  
                {
                    "titulo": this.titulo,
                    "descripcion": this.descripcion,
                    "precio": this.precio,
                    "cantidad": this.cantidad,
                }
            });
            this.titulo = null
            this.descripcion = null
            this.precio = null
            this.cantidad = null
            
            await this.getProductos()
            this.cerrarModal()
        },




    },
    created(){
        this.getProductos()
    }
}
</script>

<style>

</style>
