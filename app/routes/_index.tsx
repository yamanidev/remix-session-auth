import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { requireUser } from '~/utils/guards.server';
import { destroySession, getSession } from '~/utils/session.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Welcome ${data?.name} | Remix Session based Authentication` }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  return user;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session)
    }
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="flex justify-center pt-52">
      <div className="w-full max-w-lg rounded-lg bg-gray-800 px-10 py-10 shadow-2xl">
        <p>Why hello there {data.name}!</p>
        <Form method="post">
          <button type="submit" className="btn btn-link">
            Log out
          </button>
        </Form>
      </div>
    </main>
  );
}
