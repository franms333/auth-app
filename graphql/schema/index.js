// import { buildSchema } from "graphql";
import { gql } from "apollo-server-express";

const graphQLSchema = gql(`
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

    type Query {
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createUser(userInput: UserInput): User
    }
`)

export default graphQLSchema;