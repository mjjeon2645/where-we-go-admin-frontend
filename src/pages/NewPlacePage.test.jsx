// TODO. 테스트 시도해보아야 함. 구조적인 문제가 있는것 아닐까 이정도면...

import { render } from '@testing-library/react';

import NewPlacePage from './NewPlacePage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let firstImageUrl;
let secondImageUrl;
let thirdImageUrl;
let isMissingAddress;
let isMissingCategory;
let errorMessage;

const uploadFirstImage = jest.fn();
const uploadSecondImage = jest.fn();
const uploadThirdImage = jest.fn();
const requestForAddingNewPlace = jest.fn();
const clearAddPlaceState = jest.fn();

jest.mock('../hooks/usePlaceStore', () => () => ({
  firstImageUrl,
  secondImageUrl,
  thirdImageUrl,
  isMissingAddress,
  isMissingCategory,
  errorMessage,
  uploadFirstImage,
  uploadSecondImage,
  uploadThirdImage,
  requestForAddingNewPlace,
  clearAddPlaceState,
}));

const context = describe;

describe('NewPlacePage', () => {
  function renderNewPlacePage() {
    render(<NewPlacePage />);
  }

  context('a manager clicks place registration button', () => {
    it('renders NewPlacePage', () => {
      renderNewPlacePage();
    });
  });
});
