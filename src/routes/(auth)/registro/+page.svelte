<!-- routes/signup/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<Card.Header>
		<h2 class="text-start text-4xl font-bold">Formulario de Registro</h2>
	</Card.Header>
	<Card.Content>
		<form method="post" use:enhance class="flex flex-col gap-4">
			<div>
				<Label for="nombres">Nombres (*)</Label>
				<Input type="text" id="nombres" name="nombres" required />
			</div>

			<div>
				<Label for="apellidos">Apellido paterno (*)</Label>
				<Input type="text" name="apellidoPaterno" required />
			</div>

			<div>
				<Label for="apellidos">Apellido materno (*)</Label>
				<Input type="text" name="apellidoMaterno" required />
			</div>

			<div>
				<Label for="email">Email (*)</Label>
				<Input type="email" id="email" name="email" required />
			</div>

			<div>
				<Label for="password">Contraseña (*)</Label>
				<Input type="password" id="password" name="password" required />
			</div>

			<div>
				<Label for="passwordConfirm">Repetir Contraseña (*)</Label>
				<Input type="password" id="passwordConfirm" name="passwordConfirm" required />
			</div>

			<Button type="submit">Crear Cuenta</Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<a href="/login">
			<Button variant="link" class="text-black">¿Ya tienes una cuenta? Inicia sesión</Button>
		</a>
	</Card.Footer>
</Card.Root>
