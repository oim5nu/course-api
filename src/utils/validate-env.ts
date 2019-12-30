import { cleanEnv, str, port } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_DBNAME: str(),
    MONGO_USER: str(),
    PORT: port()
  });
};

export { validateEnv };
