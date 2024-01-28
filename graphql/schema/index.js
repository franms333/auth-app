import { buildSchema } from "graphql";

const graphQLSchema = buildSchema(`
    type User {
        _id: ID!,
        name: String!,
        email: String!,
        password: String
    }

    type AuthData {
        userId: ID!
        name: String!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

export default graphQLSchema;