export function sidoFormatter(sido) {
  switch (sido) {
  case '충남':
  case '충북':
    return '충청';
  case '전남':
  case '전북':
    return '전라';
  case '경북':
  case '경남':
    return '경상';
  case '제주특별자치도':
    return '제주';
  case '세종특별자치시':
    return '세종';
  default:
    return sido;
  }
}

export function fullAddressFormater(roadAddress, jibunAddress, detailAddress) {
  if (!roadAddress) {
    return `${jibunAddress} ${detailAddress}`;
  }
  return `${roadAddress} ${detailAddress}`;
}

// TODO: Delete This!
export const xxx = '';
