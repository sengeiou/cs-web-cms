import httpRequest from "@/utils/http";

export const apiGetDailyTagReport = async (query) => {
	return httpRequest({
		url: '/report/daily-tag?' + query ,
		method: 'GET',
	})
}

export const apiGetDailyGuestReport = async (query) => {
	return httpRequest({
		url: '/report/daily-guest?' + query ,
		method: 'GET',
	})
}
