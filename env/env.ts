import * as dotenv from 'dotenv';

export const getEnvironment = () => {
    dotenv.config({
        override: true,
        path: `env/.env.${process.env.ENV}`
    });
}
