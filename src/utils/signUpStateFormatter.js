export function signUpStateFormatter(state) {
  switch (state) {
  case 'registered':
    return '가입 완료';
  case 'unregistered':
    return '가입 미완료';
  default:
    return '확인 필요';
  }
}

// TODO: Delete This!
export const xxx = '';
