import httpRequest from "@/utils/http";

export const apiGetRoomMessageList = async (query) => {
    return httpRequest({
        url: '/messages?' + query,
        method: 'GET',
    })
}

export const apiGetMessageList = async (query) => {
    return httpRequest({
        url: '/messages?' + query,
        method: 'GET',
    })
}
