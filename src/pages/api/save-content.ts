export const prerender = false;

import fs from 'node:fs/promises';
import path from 'node:path';

const ADMIN_PASSWORD = 'rinconcillo2024';
const CONTENT_FILE = path.join(process.cwd(), 'src/data/content.json');

export const POST = async ({ request, cookies, redirect }) => {
  const isLoggedIn = cookies.get('admin_auth')?.value === ADMIN_PASSWORD;
  
  if (!isLoggedIn) {
    return redirect('/admin?error=1');
  }

  const formData = await request.formData();
  const content = formData.get('content');

  try {
    JSON.parse(content);
    await fs.writeFile(CONTENT_FILE, content, 'utf-8');
    return redirect('/admin?saved=1');
  } catch (e) {
    return redirect('/admin?error=json');
  }
};
