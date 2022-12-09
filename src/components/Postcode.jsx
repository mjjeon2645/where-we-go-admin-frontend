/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const { kakao } = window;

const Container = styled.div`
  margin-block: 2em;
`;

const Title = styled.p`
  font-size: .9em;
  color: #A0A0A0;
  margin-bottom: .5em;
`;

const Label = styled.label`
  font-size: .8em;

  strong {
    display: inline-block;
    width: 80px;
    margin-block: .8em;
    padding-left: .5em;
  }

  input {
    width: 230px;
    padding-block: .3em;
  }
`;

const FindButton = styled.div`
  text-align: right;

  button {
    background-color: #054468;
    color: #FFF;
    margin-top: 1em;
    border: none;
    padding: .5em 1em;
    border-radius: 8px;
  }
`;

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
    <Container>
      <Title>주소: </Title>
      <p>
        <Label htmlFor="road-address">
          <strong>도로명 주소</strong>
          <input
            id="road-address"
            placeholder="도로명주소"
            disabled
            value={roadAddress}
          />
        </Label>
      </p>
      <p>
        <Label htmlFor="jibun-address">
          <strong>지번 주소</strong>
          <input
            id="jibun-address"
            placeholder="지번주소"
            disabled
            value={jibunAddress}
          />
        </Label>
      </p>
      <FindButton>
        <button type="button" onClick={handlePostCodeOpenClick}>
          주소 찾기
        </button>
      </FindButton>
    </Container>
  );
}
