import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Number = styled.th`
  width: 10%;
`;

const SelectBox = styled.th`
  width: 10%;
`;

const Place = styled.th`
  width: 30%;
`;

const Address = styled.th`
  width: 50%;
`;

export default function BookmarksListOfSelectedUser({ bookmarks }) {
  return (
    <article>
      <Title>즐겨찾기 목록</Title>
      {bookmarks.length ? (
        <table>
          <thead>
            <tr>
              <Number>No.</Number>
              <SelectBox>선택</SelectBox>
              <Place>장소명</Place>
              <Address>주소</Address>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => (
              <tr key={bookmark.placeId}>
                <td>{bookmarks.length - index}</td>
                <td><input type="checkbox" /></td>
                <td>{bookmark.name}</td>
                <td>{bookmark.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>즐겨찾기 목록이 없습니다.</p>
      )}
    </article>
  );
}
