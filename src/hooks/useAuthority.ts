import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';

const useForm = ({}) => {
  const { accessToken, username, saveUser, removeUser } = useUserStore();

  useEffect(() => {
    accessToken;
  }, []);

  // const supabase = createClient();
  // const handleClick = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'github',
  //   });
  // };
  // const googlehandleClick = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   });
  // };

  // console.log(
  //   'supabase.auth.user()',
  //   supabase.auth.getUser().then(res => console.log('res', res))
  // );

  return {};
};

export default useForm;
