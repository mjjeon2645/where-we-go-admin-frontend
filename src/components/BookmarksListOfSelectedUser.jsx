import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
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
`;

const Number = styled.th`
  width: 10%;
`;

const Place = styled.th`
  width: 35%;
`;

const Address = styled.th`
  width: 55%;
`;

export default function BookmarksListOfSelectedUser({ bookmarks }) {
  return (
    <article>
      <Title>즐겨찾기 목록</Title>
      {bookmarks.length ? (
        <Table>
          <thead>
            <tr>
              <Number>No.</Number>
              <Place>장소명</Place>
              <Address>주소</Address>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => (
              <tr key={bookmark.placeId}>
                <td>{bookmarks.length - index}</td>
                <td>{bookmark.name}</td>
                <td>{bookmark.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>즐겨찾기 목록이 없습니다.</p>
      )}
    </article>
  );
}
