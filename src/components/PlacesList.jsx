import styled from 'styled-components';

const SubFunction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3em;
  margin-bottom: .5em;

  /* button {
    color: #FFF;
    background: #054468;
    border: none;
    border-radius: 8px;
    padding: .5em 1em;
  } */

  strong {
    color: #ff6416;
  }
`;

const AddButton = styled.button`
  color: #FFF;
  background: #054468;
  border: none;
  border-radius: 8px;
  padding: .5em 1em;
  margin-top: 5em;
`;

const Table = styled.table`
  text-align: center;
  width: 100%;

  th {
    font-size: .8em;
    font-weight: bold;
    padding-block: 1em;
    background-color: #EEE;
  }

  td {
    font-size: .8em;
    padding-block: 1em;
    padding-inline: .2em;
  }

  button {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #DDD;
  }
`;

const Number = styled.th`
  width: 5%;
`;

const PlaceName = styled.th`
  width: 23%;
`;

const Identifier = styled.th`
  width: 7%;
`;

const Address = styled.th`
  width: 55%;
`;

const Category = styled.th`
  width: 10%;
`;

const NoPlaces = styled.p`
  margin-top: 3em;
`;

export default function PlacesList({ places, goAddPlacePage, goPlaceDetailPage }) {
  const handleAddPlaceClick = () => {
    goAddPlacePage();
  };
  const handlePlaceDetailClick = (id) => {
    goPlaceDetailPage(id);
  };

  return (
    <article>
      <AddButton type="button" onClick={handleAddPlaceClick}>신규 장소 추가하기</AddButton>
      {places.length ? (
        <div>
          <SubFunction>
            {/* <button type="button" onClick={handleAddPlaceClick}>신규 장소 추가하기</button> */}
            <p>
              총
              {' '}
              <strong>{places.length}</strong>
              개
            </p>
          </SubFunction>
          <Table>
            <thead>
              <tr>
                <Number>No.</Number>
                <PlaceName>장소명</PlaceName>
                <Identifier>고유번호</Identifier>
                <Address>주소</Address>
                <Category>카테고리</Category>
              </tr>
            </thead>
            <tbody>
              {places.map((place, index) => (
                <tr key={place.placeId}>
                  <td>{places.length - index}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handlePlaceDetailClick(place.placeId)}
                    >
                      {place.name}
                    </button>
                  </td>
                  <td>{place.placeId}</td>
                  <td>{place.address.fullAddress}</td>
                  <td>{place.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoPlaces>등록된 장소가 없습니다.</NoPlaces>
      )}
    </article>
  );
}
