export const prerender = false;

import fs from 'node:fs/promises';
import path from 'node:path';

const ADMIN_PASSWORD = 'rinconcillo2024';
const CONTENT_FILE = path.join(process.cwd(), 'src/data/content.json');

export const GET = async ({ cookies, redirect }) => {
  const isLoggedIn = cookies.get('admin_auth')?.value === ADMIN_PASSWORD;
  
  if (!isLoggedIn) {
    return redirect('/admin?error=1');
  }

  try {
    const content = await fs.readFile(CONTENT_FILE, 'utf-8');
    return new Response(content, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response('{}', { status: 500 });
  }
};
