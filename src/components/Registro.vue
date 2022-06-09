<template>
    <div class="container">
         <div class="row align-items-start">
            <div class="card col" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Registrese para ingresar al sistema</h5>
                    <div>
                        <form>
                            <div class="mb-3">
                                <select class="form-select" v-model="rol">
                                    <option value="cliente" selected>Usuario de tipo cliente</option>
                                    <option value="admin">Usuario Administrador</option>
                                 </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input type="text" class="form-control"  aria-describedby="emailHelp" @keyup="validarNombre" v-model="nombre">
                            </div>
                            <div class="row" v-if='nombreValido != ""'>
                            <p class="text-danger">{{ nombreValido }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Correo electronico</label>
                                <input type="email" class="form-control" aria-describedby="emailHelp" @keyup="validarEmail" v-model="email">
                            </div>
                            <div class="row" v-if='emailValido != ""'>
                            <p class="text-danger">{{ emailValido }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Contraseña</label>
                                <input type="password" class="form-control" @keyup="validarPass" v-model="password">
                            </div>
                            <div class="row" v-if='passValida != ""'>
                            <p class="text-danger">{{ passValida }}</p>
                            </div>
                        </form>
                    </div>
                    <button class="btn btn-success" @click="insertUsuario()">Agregar usuario</button>
                    <a class="btn btn-danger" href="/login">Ya tengo cuenta, ir a login</a>
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
    name: "Registro",
    data(){
        return {
            nombre: null,
            email: null,
            password: null,
            rol: "cliente",
            nombreValido: "",
            emailValido: "",
            passValida: "",
        }
    },
    methods:{
        async insertUsuario(){
            const usuario = await Vue.axios({
                method: 'post',
                url: 'https://628ee4bddc47852365360ef5.mockapi.io/api/v1/usuario',
                data:  {
                    "nombre": this.nombre,
                    "email": this.email,
                    "contrasena": this.password,
                    "tipoUsuario": this.rol,
                },
            });
            this.$router.push('/login')

        },
        validarNombre(){
            const valnombre = /[a-zA-Z]{3,}\s[a-zA-Z]{3,}/g;
            if (valnombre.test(this.nombre)){
            this.nombreValido = "";
                return true;
            } else {
                this.nombreValido = "El Nombre y Apellido debe contener al menos 3 caracteres.";
                return false;
            }
        },
        validarEmail() {
            const valemail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
           if (valemail.test(this.email)){
                this.emailValido = "";
                return true;
            } else {
                this.emailValido = "Mail incorrecto";
                return false;
            }

        },
        validarPass(){
            let valpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (valpass.test(this.password)){
                this.passValida = "";
                return true;
            } else {
                this.passValida = "La contraseña debe contener al menos 8 caracteres, una mayúscula, un caracter especial y un número."
                return false;
            }
        },
    }
}
</script>

<style>

</style>
