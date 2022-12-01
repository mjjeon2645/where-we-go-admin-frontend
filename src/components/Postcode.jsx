/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const { kakao } = window;

export default function Postcode({
  changeRoadAddress, changeJibunAddress, changeSido, changeSigungu, changeLatitude, changeLongitude,
}) {
  const open = useDaumPostcodePopup();

  const [roadAddress, setLoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    changeSido(data.sido);
    const { sigungu } = data;

    if (sigungu.indexOf(' ') === -1) {
      changeSigungu(sigungu);
    }

    if (sigungu.indexOf(' ') !== -1) {
      changeSigungu(sigungu.split(' ')[0]);
    }

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';

      setLoadAddress(fullAddress); // 도로명 주소
      setJibunAddress(data.jibunAddress); // 지번주소

      changeRoadAddress(fullAddress);
      changeJibunAddress(data.jibunAddress);
    }

    if (data.addressType === 'J') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';

      setLoadAddress(data.roadAddress); // 도로명 주소
      setJibunAddress(data.jibunAddress); // 지번주소

      changeRoadAddress(data.roadAddress);
      changeJibunAddress(data.jibunAddress);
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(fullAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        changeLongitude(x);
        changeLatitude(y);
      }
    });
  };

  const handlePostCodeOpenClick = () => {
    open(
      { onComplete: handleComplete },
    );
  };

  return (
    <div>
      <p>주소</p>
      <button type="button" onClick={handlePostCodeOpenClick}>
        주소 찾기
      </button>
      <p>
        <label htmlFor="road-address">
          도로명 주소
          <input
            id="road-address"
            placeholder="도로명주소"
            disabled
            value={roadAddress}
          />
        </label>
      </p>
      <p>
        <label htmlFor="jibun-address">
          지번 주소
          <input
            id="jibun-address"
            placeholder="지번주소"
            disabled
            value={jibunAddress}
          />
        </label>
      </p>
    </div>
  );
}
