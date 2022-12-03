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

const SelectBox = styled.th`
  width: 5%;
`;

const PlaceName = styled.th`
  width: 20%;
`;

const Identifier = styled.th`
  width: 5%;
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
                <SelectBox>선택</SelectBox>
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
                  <td><input type="checkbox" /></td>
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
        <p>now loading...</p>
      )}
    </Container>
  );
}
