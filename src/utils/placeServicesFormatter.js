export function placeServicesFormatter(state) {
  switch (state) {
  case 'possible':
    return '가능';
  case 'impossible':
    return '불가능';
  default:
    return '확인 필요';
  }
}

// TODO: Delete This!
export const xxx = '';
