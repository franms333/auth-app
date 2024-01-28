import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { graphqlHTTP } from "express-graphql";
import functions from 'firebase-functions';
import graphQLSchema from './graphql/schema/index.js';
import rootResolver from './graphql/resolver/index.js';

dotenv.config();
const app = express();

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

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: rootResolver,
    graphiql: true
}))

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dgzs0zh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
mongoose.connect(`mongodb+srv://admin:masterkey1234@cluster0.dgzs0zh.mongodb.net/auth-app?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3001);
    console.log("Connected to MongoDB!")
})
.catch(err => {
    console.log(err)
})

export const api = functions.https.onRequest(app);