import { NodeEnv } from '@common/enums';

type AppConfig = {
  nodeEnv: NodeEnv;
  port: number;
  postgresHost: string;
  postgresUser: string;
  postgresPwd: string;
  postgresDB: string;
};

export default AppConfig;
