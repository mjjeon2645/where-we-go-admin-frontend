// TODO. 라이브러리 사용 시 테스트 어떻게 진행하는지.

import { fireEvent, render, screen } from '@testing-library/react';
import Postcode from './Postcode';

const changeRoadAddress = jest.fn();
const changeJibunAddress = jest.fn();
const changeSido = jest.fn();
const changeSigungu = jest.fn();
const changeLatitude = jest.fn();
const changeLongitude = jest.fn();

const context = describe;

describe('PostCode', () => {
  function renderPostCode() {
    render(<Postcode
      changeRoadAddress={changeRoadAddress}
      changeJibunAddress={changeJibunAddress}
      changeSido={changeSido}
      changeSigungu={changeSigungu}
      changeLatitude={changeLatitude}
      changeLongitude={changeLongitude}
    />);
  }

  context('a manager clicks search an address button', () => {
    it('renders post code popup', () => {
      renderPostCode();

      screen.getByText('주소:');

      fireEvent.click(screen.getByText('주소 찾기'));
    });
  });
});
