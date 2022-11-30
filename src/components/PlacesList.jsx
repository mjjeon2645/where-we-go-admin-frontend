import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    //
`;

export default function PlacesList({ places }) {
  const navigate = useNavigate();

  const handlePlaceDetailClick = (id) => {
    navigate(`/places/${id}`);
  };

  console.log(places);
  return (
    <Container>
      {places.length ? (
        <div>
          <div>
            places list
          </div>
          <ul>
            {places.map((place) => (
              <li key={place.placeId}>
                <p>{place.placeId}</p>
                <button type="button" onClick={() => handlePlaceDetailClick(place.placeId)}>
                  <p>{place.name}</p>
                </button>
                <p>{place.category}</p>
                <p>{place.address.fullAddress}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </Container>
  );
}
