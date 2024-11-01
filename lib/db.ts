import { PrismaClient, User } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// Create a new user
export const createUser = async (
  email: string,
  userId: string,
  name: string
): Promise<User | null> => {
  try {
    const newUser = await prisma.user.create({
      data: { userId, email, name },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// Update an existing user
export const updateUser = async (userId: string, data: Partial<User>): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Get a user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};

// Get a user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    return null;
  }
};
