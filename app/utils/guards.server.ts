import { redirect } from '@remix-run/node';
import { getUser } from '~/models/user.server';
import { getUserIdFromSession } from './session.server';

export async function requireUser(request: Request) {
  const userId = await getUserIdFromSession(request);

  if (!userId) return redirect('/login');

  const user = await getUser(userId);

  if (!user) return redirect('/login');

  return { id: user.id, name: user.name, email: user.email };
}
