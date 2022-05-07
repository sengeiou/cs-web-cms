import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetRoleList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listRole($filter: ListRoleInput!, $pagination: PaginationInput!) {
        listRole(filter: $filter, pagination: $pagination) {
            roles {
                id
                name
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

export const apiCreateRole = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation createRole($input: CreateRoleInput!) {
        createRole(input: $input)
    }`,
		variables: data,
	})
}

export const apiGetRoleDetail = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query getRole($input: Int64!) {
        getRole(id: $input) {
            role {
                id
                name
                permissions
            }
        }
    }`,
		variables: data,
	})
}

export const apiUpdateRole = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation updateRole($input: UpdateRoleInput!) {
        updateRole(input: $input)
    }`,
		variables: data,
	})
}

export const apiDeleteRole = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation deleteRole($input: Int64!) {
        deleteRole(id: $input)
    }`,
		variables: data,
	})
}
