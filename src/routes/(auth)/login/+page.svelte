<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root>
	<Card.Header>
		<h2 class="text-4xl font-bold">Iniciar Sesión</h2>
	</Card.Header>
	<Card.Content>
		<form method="post" use:enhance class="space-y-4">
			<div class="flex flex-col gap-2">
				<Label for="email">Email:</Label>
				<Input type="email" id="email" name="email" required placeholder="Ingrese su correo" />
			</div>

			<div class="flex flex-col gap-2">
				<Label for="password">Contraseña:</Label>
				<Input
					type="password"
					id="password"
					name="password"
					required
					placeholder="ingrese su password"
				/>
			</div>

			<Button type="submit" class="w-full">Iniciar Sesión</Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<a href="/registro">
			<Button variant="link" type="button" class="text-black"
				>¿No tienes una cuenta? Regístrate</Button
			>
		</a>
	</Card.Footer>
</Card.Root>
