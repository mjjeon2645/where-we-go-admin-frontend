import styled from 'styled-components';

const Container = styled.div`
    padding: 3em;
`;

const Table = styled.table`
  text-align: center;
`;

const Number = styled.th`
  width: 5%;
`;

const PlaceName = styled.th`
  width: 20%;
`;

const Identifier = styled.th`
  width: 10%;
`;

const Address = styled.th`
  width: 55%;
`;

const Category = styled.th`
  width: 10%;
`;

export default function PlacesList({ places, goPlaceDetailPage }) {
  const handlePlaceDetailClick = (id) => {
    goPlaceDetailPage(id);
  };

  return (
    <Container>
      {places.length ? (
        <div>
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
        <p>등록된 장소가 없습니다.</p>
      )}
    </Container>
  );
}
