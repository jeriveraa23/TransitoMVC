require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const { testConnection } = require('./src/config/database');

async function startServer() {
    const app = express();
    const graphqlBodyLimit = '8mb';
    
    // 1. CORS primero que todo
    app.use(cors());

    // 2. IMPORTANTE: NO uses app.use(express.json()) antes de Apollo
    // Si tienes rutas REST viejas que lo necesiten, úsalo SOLO en esas rutas
    // o ponlo DESPUÉS de server.applyMiddleware.

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    
    // 3. Apollo consume su propio body, así que va aquí
    server.applyMiddleware({
        app,
        bodyParserConfig: {
            limit: graphqlBodyLimit,
        },
    });

    // 4. Si aún necesitas express.json para rutas que NO sean GraphQL:
    app.use(express.json()); 

    app.get('/', (req, res) => {
        res.send('<h1>Servidor de Transito Sabaneta corriendo</h1>');
    });

    const PORT = process.env.PORT || 4000;

    try {
        await testConnection();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor listo en http://localhost:${PORT}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

startServer();