import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { login } from '~/models/user.server';
import { getUserIdFromSession, getUserSessionHeader } from '~/utils/session.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Log in | Remix Session based Authentication' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const user = await login(email as string, password as string);
  if (user) {
    const header = await getUserSessionHeader(user);

    return redirect('/', {
      headers: {
        'Set-Cookie': header
      }
    });
  }
  return null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUserIdFromSession(request);
  if (user) return redirect('/');
  return null;
};

export default function Index() {
  return (
    <main className="flex justify-center px-4 pt-52 sm:px-0">
      <div className="w-full max-w-lg rounded-lg bg-gray-800 px-5 py-10 shadow-2xl sm:px-10">
        <h1 className="mb-4 text-3xl font-semibold">Login</h1>
        <form method="post">
          <div>
            <label htmlFor="email" className="label label-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="label label-text">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <input type="submit" value="Submit" className="btn btn-neutral mt-4 w-full" />
        </form>
        <div className="mt-6 text-center">
          <p>Don't have an account?</p>
          <Link to="/signup" className="btn btn-link btn-sm leading-none">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
