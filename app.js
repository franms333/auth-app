import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {ApolloServer} from 'apollo-server-express';
import graphQLSchema from './graphql/schema/index.js';
import rootResolver from './graphql/resolver/index.js';

dotenv.config();
export const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:masterkey1234@cluster0.dgzs0zh.mongodb.net/auth-app?retryWrites=true&w=majority`);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}

async function start(){
    const apolloServer = new ApolloServer({
        typeDefs: graphQLSchema,
        resolvers: rootResolver,
        persistedQueries: false
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app
    })    

    app.get('*', (req,res) => res.status(404).send('Error 404 - Page not found'))

    app.listen(3002, () => {
        console.log('Server alive on port:', 3002)
    })
}

connectDB();
start();