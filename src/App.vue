<template>

	<div>

		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Ecommerce</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link class="nav-link" to="/">Home</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/carrito">Carrito</router-link>
						</li>
						<li class="nav-item">
							<a class="nav-link text-danger" @click="cerrarSesion">Cerrar sesión</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>


		<div class="container">
			<router-view />
		</div>
	</div>

</template>


<script>
export default {
	methods: {
		cerrarSesion(){
			localStorage.clear()
			location.reload
		}
	},
	created(){
		
	}
}
</script>