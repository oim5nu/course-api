import { MongoMemoryServer } from 'mongodb-memory-server';

const startMongoMemoryServer = async () => {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getConnectionString();

  return uri;
};

export { startMongoMemoryServer };
