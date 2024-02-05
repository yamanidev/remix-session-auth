import { User } from '@prisma/client';
import { createCookieSessionStorage } from '@remix-run/node';

const { commitSession, destroySession, getSession } = createCookieSessionStorage({
  cookie: {
    name: 'auth',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    secrets: ['idk']
  }
});

export async function getUserSessionHeader(user: Pick<User, 'id'>) {
  const session = await getSession();
  session.set('userId', user.id);
  const header = await commitSession(session);
  return header;
}

export async function getUserIdFromSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');
  return userId;
}

export { getSession, commitSession, destroySession };
