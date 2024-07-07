import { useUserStore } from '@/store/user';
import { myPage } from './style.css';

export default function MyPage() {
  const { accessToken, username, saveUser, removeUser } = useUserStore();

  return <div className={myPage}>myPage 입니다</div>;
}
