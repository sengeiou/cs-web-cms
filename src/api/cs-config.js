import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";
import httpRequest from "@/utils/http";

export const apiGetCsConfig = async () => {
	return httpRequest({
		url: '/cs-config',
		method: 'GET',
	})
}

export const apiUpdateCsConfig = async (data) => {
	return httpRequest({
		url: '/cs-config',
		method: 'PUT',
		data
	})
}
