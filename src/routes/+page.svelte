<script lang="ts">
	import { enhance } from '$app/forms';
	import { Avatar } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LogOut, SendIcon, User } from 'lucide-svelte';
	import type { User as IUSer } from 'lucia';
	import { socketStore } from './store/socketStore';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';

	type ChatMensaje = {
		id: string;
		nombres: string;
		apellidos: string;
		mensaje: string;

		fecha: number;
	};

	export let data: {
		user: IUSer;
	};
	$: ({ socket } = socketStore);

	let chats: ChatMensaje[] = [];
	// biome-ignore lint/style/useConst: <explanation>
	let mensaje = '';

	$: socket?.on('recibir-mensajes', (payload: ChatMensaje[]) => {
		chats = [...payload];
	});
</script>

<div class="flex h-screen flex-col">
	<header
		class="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground shadow"
	>
		<div class="flex items-center justify-start gap-2">
			<div class="flex size-8 items-center justify-center">
				<WhatsAppIcon />
			</div>
			<div class="font-medium uppercase">Chat</div>
		</div>
		<form method="post" use:enhance action="?/cerrarSesion" class="flex items-center gap-2">
			<Button variant="ghost" size="icon" type="submit">
				<LogOut class="size-6" />
				<span class="sr-only">Cerrar sesion</span>
			</Button>
		</form>
	</header>
	<div class="flex-1 space-y-4 overflow-auto p-4">
		{#each chats as chat}
			{#if chat.id === data.user.id}
				<div class="flex items-start justify-end gap-3">
					<div class="max-w-[80%] rounded-lg bg-primary p-3 text-primary-foreground">
						<p>{chat.mensaje}</p>
						<div class="mt-1 text-xs text-primary-foreground/80">2:31 PM</div>
					</div>
					<Avatar class="flex h-8 w-8 items-center justify-center border">
						<User class="size-6" />
					</Avatar>
				</div>
			{:else}
				<div class="flex items-start gap-3">
					<Avatar class="flex h-8 w-8 items-center justify-center border">
						<User class="size-6" />
					</Avatar>
					<div class="max-w-[80%] rounded-lg bg-muted p-3">
						<div class="text-md mt-1 font-semibold capitalize">
							~ {chat.nombres}
							{chat.apellidos}
						</div>
						<p>{chat.mensaje}</p>
						<div class="mt-1 text-xs text-muted-foreground">2:30 PM</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<form
		class="flex items-center gap-2 border-t bg-background px-4 py-3"
		on:submit|preventDefault={() => {
			if (!mensaje) return;

			socket?.emit('enviar-mensaje', { mensaje, id: data.user.id });
		}}
	>
		<Textarea
			placeholder="Escribe tu mensaje..."
			class="flex-1 resize-none rounded-lg border-2 border-muted px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
			bind:value={mensaje}
		/>
		<Button type="submit">
			<SendIcon class="h-5 w-5" />
			<span class="sr-only">Enviar mensaje</span>
		</Button>
	</form>
</div>
