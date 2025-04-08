import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const authDB = client.db("auth");

export const getUserByEmail = async (email: string) => {
  await authDB.collection("users").findOne({ email });
};

export const saveUserToDB = async (userData: any) => {
  const now = new Date();
  const authData = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    provider: userData.provider,
    createdAt: now,
    update: now,
    role: userData.role ?? "user",
    image: userData.image ?? null,
    isEmailVerified: userData.isEmailVerified ?? false,
    emailVerifyToken: userData.emailVerifyToken ?? null,
    resetPasswordToken: userData.resetPasswordToken ?? null,
    bio: userData.bio ?? null,
  };

  return await authDB.collection("users").insertOne(authData);
};
