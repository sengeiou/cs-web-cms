import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetRoomMessageList = async (data) => {
	return await apolloProvider.defaultClient.query({
		query: gql`query listRoomMessage($roomID: Int64!) {
        listRoomMessage(roomID: $roomID) {
            messages {
                id
                messageType
                roomID
                senderName
                contentType
                content
                extraInfo {
                    clientName
                }
                timestamp
            }
        }
    }`,
		variables: data,
	})
}

export const apiGetMessageList = async (data) => {
    return await apolloProvider.defaultClient.query({
        query: gql`query listMessage($filter: ListMessageInput!, $pagination: PaginationInput!) {
            listMessage(filter: $filter, pagination: $pagination) {
                messages {
                    id
                    messageType
                    roomID
                    senderName
                    contentType
                    content
                    extraInfo {
                        clientName
                    }
                    timestamp
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
