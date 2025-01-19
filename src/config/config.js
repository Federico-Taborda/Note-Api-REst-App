const config = {
    server : {
        port: process.env.PORT || 3000
    },
    database : {
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
    },
    enviroment: process.env.NODE_ENV
}
export default config;