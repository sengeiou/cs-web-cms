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
		if(message.contentType === 'Join') {
			const result = state.roomList.filter(item => item.id === message.roomID);
			if(result.length === 0) {
				state.roomList.push({
					id: message.roomID,
					memberName: message.extraInfo.clientName,
					status: "Serving",
					message: "- 無內容 -",
					isRead: false,
				})
			}
		} else {
			let i
			for (i = 0; i < state.roomList.length; i++) {
				if (state.roomList[i].id === message.roomID) {
					if(message.messageType ===  "Member") {
						state.roomList[i].message = message.content
					}
					break
				}
			}
			if(message.roomID === state.activeRoomId) {
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
}

const actions = {
	getStaffRoomList({ commit }, payload) {
		return new Promise((resolve, reject) => {
			apiGetStaffRoomList(payload)
				.then((response) => {
					commit('SET_ROOMS', response.data.listStaffRoom.rooms)
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
					commit('SET_MESSAGE_LIST', response.data.listRoomMessage.messages)
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
