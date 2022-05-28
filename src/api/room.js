import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";
import httpRequest from "@/utils/http";

export const apiGetStaffRoomList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listStaffRoom($filter: ListStaffRoomInput!, $pagination: PaginationInput!) {
        listStaffRoom(filter: $filter, pagination: $pagination) {
            rooms {
                id
                memberName
                status
            }
            pagination {
                page
                pageSize
                total
            }
        }
    }`,
		variables: data,
	})
}

export const apiGetRoomList = async (query) => {
	return httpRequest({
		url: '/rooms?' + query,
		method: 'GET',
	})
}

export const apiAcceptRoom = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation acceptRoom($id: Int64!) {
        acceptRoom(id: $id)
    }`,
		variables: data,
	})
}

export const apiCloseRoom = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation closeRoom($input: CloseRoomInput!) {
        closeRoom(input: $input)
    }`,
		variables: data,
	})
}

export const apiTransferRoom = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation transferRoom($input: TransferRoomInput!) {
        transferRoom(input: $input)
    }`,
		variables: data,
	})
}
