import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiAuthLogin = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation login($input: LoginInput!) {
        login(input: $input) {
            staffID
            username
            token
        }
    }`,
		variables: data,
	})
}

export const apiAuthLogout = async () => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation logout {
        logout
    }`,
	})
}