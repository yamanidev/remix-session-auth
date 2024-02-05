import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { signup } from '~/models/user.server';
import { getUserIdFromSession, getUserSessionHeader } from '~/utils/session.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Sign up | Remix Session based Authentication' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const name = form.get('name');
  const email = form.get('email');
  const password = form.get('password');
  const user = await signup(name as string, email as string, password as string);
  const header = await getUserSessionHeader(user);

  return redirect('/', {
    headers: {
      'Set-Cookie': header
    }
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUserIdFromSession(request);
  if (user) return redirect('/');
  return null;
};

export default function SignUp() {
  return (
    <main className="flex justify-center pt-52">
      <div className="w-full max-w-lg rounded-lg bg-gray-800 px-5 py-10 shadow-2xl sm:px-10">
        <h1 className="mb-4 text-3xl font-semibold">Create an account</h1>
        <Form method="post">
          <div>
            <label htmlFor="name" className="label label-text">
              Name
            </label>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Mohamed"
              className="input input-bordered w-full"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="label label-text">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="input input-bordered w-full"
              required
            />
          </div>
          <input type="submit" value="Submit" className="btn btn-neutral mt-4 w-full" />
        </Form>
        <div className="mt-6 text-center">
          <p>Already have an account?</p>
          <Link to="/" className="btn btn-link btn-sm leading-none">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
