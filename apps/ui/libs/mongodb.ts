import { createConnection, Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Missing Database URI in .env file");

let connection: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
  if (connection === null) {
    connection = createConnection(MONGO_URI, {
      bufferCommands: true,
    });
  }
  return connection;
};
