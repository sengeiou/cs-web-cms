import { deepCopy } from '@/utils'
import {apiGetStaffRoomList} from "@/api/room";
import {apiGetRoomMessageList} from "@/api/message";

const initialState = {
	newMessage: false,
	activeRoomId: 0,
	roomList: [],
	activeTab: "Serving",
	messageList: [],
}

const state = deepCopy(initialState)

const mutations = {
	RESET: (state) => {
		state.activeRoomId = 0
		state.roomList = []
		state.activeTab = "Serving"
		state.messageList = []
	},
	SET_ACTIVE_ROOM: (state, activeRoomId) => {
		state.activeRoomId = activeRoomId
	},
	SET_ROOMS: (state, rooms) => {
		state.roomList = []
		for(let i=0; i < rooms.length; i++) {
			state.roomList.push({...rooms[i], message:"- 無內容 -", isRead: true})
		}
	},
	SET_ACTIVE_TAB: (state, tab) => {
		state.activeTab = tab
	},
	APPEND_MESSAGE(state, message) {
		state.newMessage = true
		// handle member join
		if(message.op_type === 5) {
			const result = state.roomList.filter(item => item.id === message.payload.room_id);
			if(result.length === 0) {
				state.roomList.push({
					id: message.payload.room_id,
					memberName: message.payload.member_name,
					status: "Serving",
					message: "- 無內容 -",
					isRead: false,
				})
			}
		} else {
			let i
			for (i = 0; i < state.roomList.length; i++) {
				if (state.roomList[i].id === message.payload.room_id) {
					if(message.payload.sender_type === 2) {
						if (message.payload.content_type === 2) {
							state.roomList[i].message = "會員上傳一張圖片"
						} else {
							state.roomList[i].message = message.payload.content
						}
					}
					break
				}
			}
			if(message.payload.room_id === state.activeRoomId) {
				state.roomList[i].isRead = true
				state.messageList.push(message)
			} else {
				state.roomList[i].isRead = false
			}
		}
	},
	SET_MESSAGE_LIST(state, messages) {
		state.messageList = messages
	},
	SET_NEW_MESSAGE(state, value) {
		state.newMessage = value
	},
	SET_MESSAGE_READ(state, roomId) {
		for (let i = 0; i < state.roomList.length; i++) {
			if (state.roomList[i].id === roomId) {
				state.roomList[i].isRead = true
				break
			}
		}
	},
}

const actions = {
	getStaffRoomList({ commit }, payload) {
		return new Promise((resolve, reject) => {
			apiGetStaffRoomList(payload)
				.then((response) => {
					commit('SET_ROOMS', response.data)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	getRoomMessageList({ commit }, payload) {
		return new Promise((resolve, reject) => {
			apiGetRoomMessageList(payload)
				.then((response) => {
					commit('SET_MESSAGE_LIST', response.data)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
}

const getters = {
	newMessage: state => state.newMessage,
	activeRoomId: state => state.activeRoomId === 0 ? "" : state.activeRoomId,
	activeTab: state => state.activeTab,
	roomList: state => state.roomList,
	messageList: state => state.messageList,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
