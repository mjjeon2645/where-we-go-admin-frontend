export default function PlaceDetail({ selectedPlace, deletePlace, goPrevPage }) {
  const handleDeletePlaceClick = (id) => {
    deletePlace(id);
  };

  const handleGoBackClick = () => {
    goPrevPage();
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => handleDeletePlaceClick(selectedPlace.placeId)}
      >
        삭제하기
      </button>
      <button type="button" onClick={handleGoBackClick}>뒤로가기</button>
      {Object.keys(selectedPlace).length ? (
        <div>
          <p>id</p>
          <p>{selectedPlace.placeId}</p>
          <p>장소명</p>
          <p>{selectedPlace.name}</p>
          <p>지도 마커 위치</p>
          <p>위도(latitude)</p>
          <p>{selectedPlace.position.latitude}</p>
          <p>경도(longitude)</p>
          <p>{selectedPlace.position.longitude}</p>
          <p>주소</p>
          <p>{selectedPlace.address.fullAddress}</p>
          <p>장소 분류</p>
          <p>{selectedPlace.category}</p>
          <p>전화번호</p>
          <p>{selectedPlace.contact.phone}</p>
          <p>홈페이지</p>
          <p>{selectedPlace.contact.homepage}</p>
          <p>편의시설</p>
          <p>예약</p>
          <p>{selectedPlace.placeServices.reservation}</p>
          <p>주차</p>
          <p>{selectedPlace.placeServices.parking}</p>
          <p>외부음식</p>
          <p>{selectedPlace.placeServices.outsideFood}</p>
          <p>수유실</p>
          <p>{selectedPlace.placeServices.nursingRoom}</p>
          <p>영업시간</p>
          <p>{selectedPlace.businessHours.monday}</p>
          <p>{selectedPlace.businessHours.tuesday}</p>
          <p>{selectedPlace.businessHours.wednesday}</p>
          <p>{selectedPlace.businessHours.thursday}</p>
          <p>{selectedPlace.businessHours.friday}</p>
          <p>{selectedPlace.businessHours.saturday}</p>
          <p>{selectedPlace.businessHours.sunday}</p>
          <p>대표 이미지</p>
          <p>이미지 1 미리보기</p>
          <img src={selectedPlace.imageSource.firstImage} alt="" />
          <p>이미지 2 미리보기</p>
          <img src={selectedPlace.imageSource.secondImage} alt="" />
          <p>이미지 3 미리보기</p>
          <img src={selectedPlace.imageSource.thirdImage} alt="" />
        </div>
      ) : (
        <p>now loading...</p>
      )}
      <div />
    </div>
  );
}
