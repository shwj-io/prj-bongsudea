type ValidationProps = {
  email?: string;
  password?: string;
  checkPassword?: string;
};

export const signUpValidation = ({
  email,
  password,
  checkPassword,
}: ValidationProps) => {
  const errors: ValidationProps = {};

  if (!email) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (password.length < 8) {
    errors.password = '8자 이상의 패스워드를 사용해야 합니다.';
  }

  if (!checkPassword) {
    errors.checkPassword = '비밀번호를 다시 입려해주세요.';
  } else if (password !== checkPassword) {
    errors.checkPassword = '입력된 비밀번호가 다릅니다.';
  }

  return errors;
};

export const loginValidation = ({ email, password }: ValidationProps) => {
  const errors: ValidationProps = {};

  if (!email) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (password.length < 8) {
    errors.password = '입력된 비밀번호가 유효하지 않습니다.';
  }

  return errors;
};
