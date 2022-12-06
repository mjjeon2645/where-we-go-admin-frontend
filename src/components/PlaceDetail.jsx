import styled from 'styled-components';
import { placeServicesFormatter } from '../utils/placeServicesFormatter';

const Field = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const BusinessHours = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;
  border-bottom: 1px solid #EEE;
  margin-bottom: 5em;
  
  p {
    color: #6c6c6c;
    margin-block: .5em;
  }
`;

const BusinessHoursTitle = styled.span`
  font-weight: bold;
`;

const ImageSection = styled.div`
  margin-block: 2em;
  p {
    font-weight: bold;
    margin-bottom: 1em;
  }
`;

const DeleteButton = styled.button`
  color: #FFF;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 30px;
  background-color: #054468;
`;

const BackButton = styled.button`
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 30px;
  background-color: #DDD;
`;

const Buttons = styled.div`
  text-align: center;
`;

export default function PlaceDetail({ selectedPlace, deletePlace, goPrevPage }) {
  const handleDeletePlaceClick = (id) => {
    deletePlace(id);
  };

  const handleGoBackClick = () => {
    goPrevPage();
  };

  return (
    <div>
      {Object.keys(selectedPlace).length ? (
        <div>
          <Field>
            <p>장소 고유번호</p>
            <span>{selectedPlace.placeId}</span>
          </Field>
          <Field>
            <p>장소명</p>
            <span>{selectedPlace.name}</span>
          </Field>
          <Field>
            <p>위도(latitude)</p>
            <span>{selectedPlace.position.latitude}</span>
          </Field>
          <Field>
            <p>경도(longitude)</p>
            <span>{selectedPlace.position.longitude}</span>
          </Field>
          <Field>
            <p>주소</p>
            <span>{selectedPlace.address.fullAddress}</span>
          </Field>
          <Field>
            <p>장소 유형</p>
            <span>{selectedPlace.category}</span>
          </Field>
          <Field>
            <p>전화번호</p>
            <span>{selectedPlace.contact.phone}</span>
          </Field>
          <Field>
            <p>홈페이지</p>
            <span>{selectedPlace.contact.homepage}</span>
          </Field>
          <Field>
            <p>예약</p>
            <span>{placeServicesFormatter(selectedPlace.placeServices.reservation)}</span>
          </Field>
          <Field>
            <p>주차</p>
            <span>{placeServicesFormatter(selectedPlace.placeServices.parking)}</span>
          </Field>
          <Field>
            <p>외부음식</p>
            <span>{placeServicesFormatter(selectedPlace.placeServices.outsideFood)}</span>
          </Field>
          <Field>
            <p>수유실</p>
            <span>{placeServicesFormatter(selectedPlace.placeServices.nursingRoom)}</span>
          </Field>
          <BusinessHours>
            <BusinessHoursTitle>영업시간</BusinessHoursTitle>
            <div>
              <p>{selectedPlace.businessHours.monday}</p>
              <p>{selectedPlace.businessHours.tuesday}</p>
              <p>{selectedPlace.businessHours.wednesday}</p>
              <p>{selectedPlace.businessHours.thursday}</p>
              <p>{selectedPlace.businessHours.friday}</p>
              <p>{selectedPlace.businessHours.saturday}</p>
              <p>{selectedPlace.businessHours.sunday}</p>
            </div>
          </BusinessHours>
          <ImageSection>
            <p>이미지 1 미리보기</p>
            <img src={selectedPlace.imageSource.firstImage} alt="" />
          </ImageSection>
          <ImageSection>
            <p>이미지 2 미리보기</p>
            <img src={selectedPlace.imageSource.secondImage} alt="" />
          </ImageSection>
          <ImageSection>
            <p>이미지 3 미리보기</p>
            <img src={selectedPlace.imageSource.thirdImage} alt="" />
          </ImageSection>
          <Buttons>
            <DeleteButton
              type="button"
              onClick={() => handleDeletePlaceClick(selectedPlace.placeId)}
            >
              삭제하기
            </DeleteButton>
            <BackButton type="button" onClick={handleGoBackClick}>뒤로가기</BackButton>
          </Buttons>
        </div>
      ) : (
        <p>now loading...</p>
      )}
      <div />
    </div>
  );
}
