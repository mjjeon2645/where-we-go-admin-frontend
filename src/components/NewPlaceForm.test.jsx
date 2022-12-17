import { render, screen } from '@testing-library/react';
import NewPlaceForm from './NewPlaceForm';

const context = describe;

const uploadFirstImage = jest.fn();
const uploadSecondImage = jest.fn();
const uploadThirdImage = jest.fn();
const submit = jest.fn();
const goPrevPage = jest.fn();

let firstImageUrl;
let secondImageUrl;
let thirdImageUrl;
let isMissingAddress;
let isMissingCategory;
let errorMessage;

describe('PlaceRegistrationForm', () => {
  function renderNewPlaceForm() {
    render(<NewPlaceForm
      uploadFirstImage={uploadFirstImage}
      firstImageUrl={firstImageUrl}
      uploadSecondImage={uploadSecondImage}
      secondImageUrl={secondImageUrl}
      uploadThirdImage={uploadThirdImage}
      thirdImageUrl={thirdImageUrl}
      submit={submit}
      goPrevPage={goPrevPage}
      isMissingAddress={isMissingAddress}
      isMissingCategory={isMissingCategory}
      errorMessage={errorMessage}
    />);
  }

  context('a manager clicks the button to add place information', () => {
    beforeEach(() => {
      firstImageUrl = 'firstImageUrl';
      secondImageUrl = 'secondImageUrl';
      thirdImageUrl = 'thirdImageUrl';
      isMissingAddress = false;
      isMissingCategory = false;
      errorMessage = '';
    });

    it('renders NewPlaceForm', () => {
      renderNewPlaceForm();

      screen.getByText('장소명:');
      screen.getByText('상세 주소:');
      screen.getByText('장소 유형:');
      screen.getByText('전화번호:');
      screen.getByText('홈페이지:');
    });
  });
});
