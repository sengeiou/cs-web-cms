import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetTagList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listTag($filter: ListTagInput!, $pagination: PaginationInput!) {
        listTag(filter: $filter, pagination: $pagination) {
            tags {
                id
                name
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

export const apiCreateTag = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation createTag($input: CreateTagInput!) {
        createTag(input: $input)
    }`,
		variables: data,
	})
}

export const apiGetTagDetail = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query getTag($input: Int64!) {
        getTag(id: $input) {
            tag {
                id
                name
                status
            }
        }
    }`,
		variables: data,
	})
}

export const apiUpdateTag = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation updateTag($input: UpdateTagInput!) {
        updateTag(input: $input)
    }`,
		variables: data,
	})
}

export const apiDeleteTag = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation deleteTag($input: Int64!) {
        deleteTag(id: $input)
    }`,
		variables: data,
	})
}
