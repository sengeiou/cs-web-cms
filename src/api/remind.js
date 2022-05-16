import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetRemindList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listRemind($filter: ListRemindInput!, $pagination: PaginationInput!) {
        listRemind(filter: $filter, pagination: $pagination) {
            reminds {
                id
                title
                content
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

export const apiCreateRemind = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation createRemind($input: CreateRemindInput!) {
        createRemind(input: $input)
    }`,
		variables: data,
	})
}

export const apiGetRemindDetail = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query getRemind($input: Int64!) {
        getRemind(id: $input) {
            remind {
                id
                title
                content
                status
            }
        }
    }`,
		variables: data,
	})
}

export const apiUpdateRemind = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation updateRemind($input: UpdateRemindInput!) {
        updateRemind(input: $input)
    }`,
		variables: data,
	})
}

export const apiDeleteRemind = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation deleteRemind($input: Int64!) {
        deleteRemind(id: $input)
    }`,
		variables: data,
	})
}
