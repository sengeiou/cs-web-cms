import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetDailyTagReport = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listDailyTagReport($filter: ListDailyTagReportInput!) {
        listDailyTagReport(filter: $filter) {
            columns {
                label
                key
            }
            items {
                date
                jsonData
            }
        }
    }`,
		variables: data,
	})
}

export const apiGetDailyGuestReport = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listDailyGuestReport($filter: ListDailyGuestReportInput!) {
        listDailyGuestReport(filter: $filter) {
            items {
                date
                guestCount
            }
        }
    }`,
		variables: data,
	})
}
