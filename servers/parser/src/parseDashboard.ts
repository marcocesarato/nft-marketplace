// @ts-ignore
import ParseDashboard from 'parse-dashboard';
import config from './config';
import MoralisEthAdapter from './auth/MoralisEthAdapter';

export const parseDashboard = new ParseDashboard({
    apps: [
        {
            databaseURI: config.DATABASE_URI,
            cloud: config.CLOUD_PATH,
            serverURL: config.SERVER_URL,
            appId: config.APPLICATION_ID,
            masterKey: config.MASTER_KEY,
            appName: 'Marketplace',
        },
    ],
});
