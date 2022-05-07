import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

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

export const apiGetRoomList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listRoom($filter: ListRoomInput!, $pagination: PaginationInput!) {
        listRoom(filter: $filter, pagination: $pagination) {
            rooms {
                id
                staffName
                memberName
                tagName
                startTime
                endTime
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
