export const prerender = false;

export const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password');
  
  const ADMIN_PASSWORD = 'rinconcillo2024';
  
  if (password === ADMIN_PASSWORD) {
    cookies.set('admin_auth', password, { path: '/', httpOnly: true });
    return redirect('/admin');
  }
  
  return redirect('/admin?error=1');
};
