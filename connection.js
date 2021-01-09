const {MongoClient} = require('mongodb');
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const connection = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    const admin = client.db(dbName).admin();
    console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
    
    client.close();
}

module.exports = connection;