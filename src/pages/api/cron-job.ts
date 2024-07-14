import cron from 'node-cron';

// 1분마다 실행되는 작업
cron.schedule('*/1 * * * *', () => {
  console.log('1분마다 실행됩니다.');
  // 여기에 실행하고 싶은 코드를 추가하세요
});

export default function handler(req, res) {
  res.status(200).json({ message: 'Cron job is running' });
}
