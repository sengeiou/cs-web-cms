import {getToken} from "@/utils/storage";
import store from '@/store'
const wsUrl = process.env.VUE_APP_WS_URL;
let socket = null;

export const connectSocket = () => {
	const token = getToken()
	socket = new WebSocket(wsUrl+"?type=1&sid="+token);
	socket.onopen = function() {
		console.log("websocket connected!!");
		store.commit("app/SET_WEBSOCKET_STATUS", true)
	};
	socket.onmessage = function(msg) {
		store.commit("cs/APPEND_MESSAGE", JSON.parse(msg.data))
	};
	socket.onerror = function(err) {
		console.log("error", err);
	};
	socket.onclose = function (event) {
		console.log(event.reason)
		store.commit("app/SET_WEBSOCKET_STATUS", false)
	}
};

export const sendSocketMessage = msg => {
	if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};

export const socketClosed = () => {
	if(socket === null) {
		return true
	}
	return 3 === socket.readyState
};
