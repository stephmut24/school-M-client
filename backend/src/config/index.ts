import type { Secret, SignOptions } from 'jsonwebtoken'

export interface ServerInterface {
  jwt: {
    secret: Secret;
    expiresIn: SignOptions['expiresIn'];
  };
  port: number;
  prefix: string;
}

export const config: ServerInterface = {
  port: Number(process.env.PORT || 4400),
  prefix: String(process.env.PREFIX || "/api/v1"),
  jwt: {
    secret: String(process.env.JWT_SECRET || ""),
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'],
  },
};

export * from "./db";
