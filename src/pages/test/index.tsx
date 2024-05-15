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
  return (
    <div>
      <button onClick={() => handleSubmit()}>리셋 버튼</button>
    </div>
  );
}
