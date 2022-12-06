import styled from 'styled-components';

const Container = styled.div`
  margin-block: 5em;  
`;

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Wrapper = styled.article`
  margin-bottom: 3em;
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

const Id = styled.th`
  width: 20%;
`;

const Gender = styled.th`
  width: 30%;
`;

const Birthday = styled.th`
  width: 40%;
`;

export default function ChildrenListOfSelectedUser({ userChildren }) {
  return (
    <Container>
      <Title>아이정보</Title>
      <Wrapper>
        {userChildren.length ? (
          <Table>
            <thead>
              <tr>
                <Number>No.</Number>
                <Id>아이정보 고유번호</Id>
                <Gender>성별</Gender>
                <Birthday>생일</Birthday>
              </tr>
            </thead>
            <tbody>
              {userChildren.map((child, index) => (
                <tr key={child.id}>
                  <td>{userChildren.length - index}</td>
                  <td>{child.id}</td>
                  <td>{child.gender}</td>
                  <td>{child.birthday}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>등록된 아이 정보가 없습니다.</p>
        )}
      </Wrapper>
    </Container>
  );
}
