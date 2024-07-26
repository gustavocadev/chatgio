import { writable } from "svelte/store";
import { io } from "socket.io-client";
import { PUBLIC_SOCKET_SERVER_URL } from "$env/static/public";

const createSocketStore = () => {
	const socket = io(PUBLIC_SOCKET_SERVER_URL, {
		transports: ["websocket"],
	});
	const isOnline = writable(false);

	socket.on("connect", () => {
		isOnline.set(true);
	});

	socket.on("disconnect", () => {
		isOnline.set(false);
	});

	return {
		socket,
		isOnline,
	};
};

export const socketStore = createSocketStore();
