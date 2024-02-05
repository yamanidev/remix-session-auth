import bcrypt from 'bcryptjs';
import { db } from '~/utils/db.server';

export async function signup(name: string, email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, email, passwordHash }
  });
  return { id: user.id, name, email };
}

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return {
    id: user.id,
    name: user.name,
    email
  };
}

export async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId
    }
  });

  return user;
}
