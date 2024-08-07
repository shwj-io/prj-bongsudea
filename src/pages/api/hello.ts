// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from '@/utils/createClient';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = createClient(req, res);
  console.log('req @@@@@@@@@@@@@@', req.cookies);
  // supabase
  //   .from('notes')
  //   .select()
  //   .then(res => {
  //     console.log('res', res);
  //   });

  // supabase
  //   .from('profiles')
  //   .select(`type_id, user_type( id )`)
  //   .then(res => {
  //     console.log('res', res);
  //   });
  // const { data, error } = await supabase.from('profiles').select(
  //   `
  //     id,
  //     username,
  //     avatar_url,
  //     email,
  //     user_type (
  //       id,
  //       type_name,
  //       type_role
  //     )
  //   `
  // );
  // const { data, error } = await supabase.from('user_type').select(
  //   `
  //     id,
  //     type_name,
  //     type_role,
  //     profiles (
  //       id,
  //       type_id,
  //       username,
  //       email
  //     )
  //   `
  // );

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'github',
  // });

  // supabase.auth
  //   .signInWithOAuth({
  //     provider: 'github',
  //     options: {
  //       redirectTo: 'http://localhost:3000/api/user',
  //     },
  //   })
  //   .then(response => {
  //     // console.log('response', response);
  //     res.redirect(response.data.url);
  //     // const test = supabase.auth.getUser();
  //     // supabase.auth.getUser().then(user => {
  //     //   console.log('user @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', user);
  //     //   res.status(200).json({ message: user });
  //     // });
  //   })
  //   .catch(error => {
  //     res.status(500).json({ error: error.message });
  //   });
  res.status(200).json({ name: 'John Doe', data: data, error });
}
