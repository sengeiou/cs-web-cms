import apolloProvider from "@/utils/gql";
import {gql} from "apollo-boost";

export const apiGetStaffList = async (data) => {
  return await apolloProvider.defaultClient.query({
    query: gql`query listStaff($filter: ListStaffInput!, $pagination: PaginationInput!) {
      listStaff(filter: $filter, pagination: $pagination) {
        staffs {
          id
          role
          name
          username
          servingStatus
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

export const apiCreateStaff = async (data) => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`mutation createStaff($input: CreateStaffInput!) {
      createStaff(input: $input)
    }`,
    variables: data,
  })
}

export const apiGetStaffDetail = async (data) => {
  return await apolloProvider.defaultClient.query({
    query: gql`query getStaff($input: Int64!) {
      getStaff(id: $input) {
        staff {
          id
          roleID
          name
          status
        }
      }
    }`,
    variables: data,
  })
}

export const apiUpdateStaff = async (data) => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`mutation updateStaff($input: UpdateStaffInput!) {
      updateStaff(input: $input)
    }`,
    variables: data,
  })
}

export const apiDeleteStaff = async (data) => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`mutation deleteStaff($input: Int64!) {
      deleteStaff(id: $input)
    }`,
    variables: data,
  })
}

export const apiUpdateStaffServingStatus = async (data) => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`mutation updateStaffServingStatus($servingStatus: StaffServingStatus!) {
      updateStaffServingStatus(servingStatus: $servingStatus)
    }`,
    variables: data,
  })
}

export const apiGetStaffInfo = async () => {
  return apolloProvider.defaultClient.query({
    query: gql`query getStaff($input: Int64!) {
      getStaff(id: $input) {
        staff {
          id
          roleID
          permissions
          name
          username
          servingStatus
          avatar
        }
      }
    }`,
    variables: {
      input: 0
    },
  })
}

export const apiUpdateStaffAvatar = async (data) => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`mutation updateStaffAvatar($avatar: String!) {
      updateStaffAvatar(avatar: $avatar)
    }`,
    variables: data,
  })
}

export const apiGetAvailableStaff = async () => {
  return await apolloProvider.defaultClient.mutate({
    mutation: gql`query listAvailableStaff {
      listAvailableStaff {
        staffs {
          id
          name
        }
      }
    }`,
  })
}
