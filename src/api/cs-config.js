import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetCsConfig = async () => {
	return await apolloProvider.defaultClient.query({
		query: gql`query getCsConfig {
        getCsConfig {
            config {
                maxMember
                memberPendingExpire
								greetingText
            }
        }
    }`,
	})
}

export const apiUpdateCsConfig = async (data) => {
	return await apolloProvider.defaultClient.mutate({
		mutation: gql`mutation updateCsConfig($input: UpdateCsConfigInput!) {
        updateCsConfig(input: $input)
    }`,
		variables: data,
	})
}
