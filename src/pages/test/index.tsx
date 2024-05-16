import axios from 'axios';

export default function TestPage() {
  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/api/auth/reset', {
        email: 'love960217@naver.com',
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleClick = () => {
    axios.get('http://localhost:3000/api/auth/login/google');
  };
  return (
    <div>
      <button onClick={() => handleSubmit()}>리셋 버튼</button>
      <button onClick={() => handleClick()}>구글로그인</button>
    </div>
  );
}
