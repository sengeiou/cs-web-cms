import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetFastMessageList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listFastMessage($filter: ListFastMessageInput!, $pagination: PaginationInput!) {
        listFastMessage(filter: $filter, pagination: $pagination) {
            fastMessages {
                id
                category
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

export const apiCreateFastMessage = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation createFastMessage($input: CreateFastMessageInput!) {
        createFastMessage(input: $input)
    }`,
		variables: data,
	})
}

export const apiGetFastMessageDetail = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query getFastMessage($input: Int64!) {
        getFastMessage(id: $input) {
            fastMessage {
                id
                categoryID
                title
                content
                status
            }
        }
    }`,
		variables: data,
	})
}

export const apiUpdateFastMessage = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation updateFastMessage($input: UpdateFastMessageInput!) {
        updateFastMessage(input: $input)
    }`,
		variables: data,
	})
}

export const apiDeleteFastMessage = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation deleteFastMessage($input: Int64!) {
        deleteFastMessage(id: $input)
    }`,
		variables: data,
	})
}

export const apiCreateCategory = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation createFastMessageCategory($input: CreateFastMessageCategoryInput!) {
        createFastMessageCategory(input: $input)
    }`,
		variables: data,
	})
}

export const apiGetCategoryList = async () => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listFastMessageCategory {
        listFastMessageCategory {
            categories {
                id
                name
            }
        }
    }`,
	})
}

export const apiGetFastMessageGroup = async () => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listFastMessageGroup {
        listFastMessageGroup {
            group {
                category {
                    id
                    name
                }
                items {
                    id
                    category
                    categoryID
                    title
                    content
                    status
                }
            }
        }
    }`,
	})
}
