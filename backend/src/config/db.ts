const prefixConf = () => {
  const prefixEnv = process.env.NODE_ENV;
  let prefix;
  switch (prefixEnv) {
    case 'development':
      prefix = 'DEV';
      break;
    case 'testing':
      prefix = 'TEST';
      break;
    case 'production':
      prefix = 'PROD';
      break;
    default:
      prefix = 'DEV';
      break;
  }
  return prefix;
};

export const databaseConnection = () => {
  const prefix = prefixConf();

  return {
    database: String(process.env[`DB_${prefix}_NAME`]),
    username: String(process.env[`DB_${prefix}_USERNAME`]),
    password: String(process.env[`DB_${prefix}_PASSWORD`]), // 🔹 force string
    port: Number(process.env[`DB_${prefix}_PORT`]),
  };
};