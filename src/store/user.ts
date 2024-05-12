import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  accessToken: '';
  username: '';
  saveUser: (token: any, name: any) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      accessToken: '',
      username: '',
      saveUser: (token, name) => {
        set(() => ({ accessToken: token, username: name }));
      },
      removeUser: () => {
        set(() => ({ accessToken: '', username: '' }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
