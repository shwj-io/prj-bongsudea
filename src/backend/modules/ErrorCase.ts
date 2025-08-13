export const ErrorMessageCase = (code: string) => {
  switch (code) {
    case 'user_already_exists':
      return '이미 존재하는 아이디입니다. 다시 시도해주세요';
    default:
      return '에러가 발생하였습니다. 다시 시도해주세요';
  }
};
