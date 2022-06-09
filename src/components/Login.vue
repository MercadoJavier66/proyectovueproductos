<template>
    <div class="container">
         <div class="row align-items-start">
            <div class="card col" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Inicie sesión</h5>
                    <div>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                            </div>
                            <div class="alert alert-danger" role="alert" v-if="datosIncorrectos">
                                Verifique los datos ingresados, por favor.
                            </div>
                        </form>
                    </div>
                    <button class="btn btn-primary" @click="ingresar()">Iniciar sesión</button>
                    <a class="btn btn-danger" href="/registro">Registrar nuevo usuario</a>
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
    name: "Login",
    data(){
        return {
            email: null,
            password: null,
            datosIncorrectos: false,
        }
    },
    methods:{
        async ingresar(){
            const listaUsuarios = await this.getUsuarios()
            const usuarioEncontrado = listaUsuarios.data.find(user => user.email == this.email && user.contrasena == this.password)
            console.log(usuarioEncontrado)
            if (usuarioEncontrado == undefined){
                this.datosIncorrectos = true
            }else {
                this.datosIncorrectos = false
                localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado))
                //ahora redirijo al usuario que fue loggeado correctamente
                if(usuarioEncontrado.tipoUsuario == 'admin'){
                    this.$router.push('/admin-productos');
                }else{
                    this.$router.push('/');

                }
            }
        },
        async getUsuarios(){
            const usuarios = await Vue.axios.get('https://628ee4bddc47852365360ef5.mockapi.io/api/v1/usuario')
            return usuarios
        }

    }

}
</script>

<style>

</style>
