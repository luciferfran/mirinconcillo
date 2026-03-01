export const prerender = false;

export const GET = async ({ cookies, redirect }) => {
  cookies.delete('admin_auth', { path: '/' });
  return redirect('/');
};
