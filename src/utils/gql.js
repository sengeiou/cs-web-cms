import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import VueApollo from "vue-apollo";
import {getToken} from "@/utils/storage";
import { setContext } from 'apollo-link-context'
import {onError} from 'apollo-link-error'
import {from} from "apollo-boost";
import store from "@/store"
import {Message} from "element-ui";
import router from "@/router";

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken()
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'X-Token': token || ''
        }
    }
})

const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: process.env.VUE_APP_GQL_URL,
})

// Cache implementation
const cache = new InMemoryCache()
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    }
}

const errorHandler = onError(({ networkError, graphQLErrors }) => {
    // console.log({graphQLErrors, networkError})
    if (networkError && networkError.statusCode === 401) {
        Message({
            message: networkError.result.message || 'Error',
            type: 'error',
            duration: 3 * 1000
        })
        store.dispatch('user/resetToken')
        router.push('login');
    } else {
        Message({
            message: graphQLErrors[0].message || 'Error',
            type: 'error',
            duration: 3 * 1000
        })
    }
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: from([
        authLink,
        errorHandler,
        httpLink,
    ]),
    cache,
    defaultOptions: defaultOptions
})

const provider = new VueApollo({
    defaultClient: apolloClient,
})

export default provider