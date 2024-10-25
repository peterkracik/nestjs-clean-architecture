export type DatabaseModuleOptions = {
  host: string;
  port: number;
  type: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
  username: string;
  password: string;
  database: string;
};

