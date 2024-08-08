const cron = require('node-cron');

// 1분마다 실행되는 작업
cron.schedule('* * * * *', () => {
  console.log('Running a job every minute');
  // 여기서 원하는 작업을 수행
});

console.log('Scheduler has been set up to run every minute');
