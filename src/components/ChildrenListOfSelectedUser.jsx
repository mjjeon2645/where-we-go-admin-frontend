import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-bottom: 3em;
`;

const Number = styled.th`
  width: 10%;
`;

const SelectBox = styled.th`
  width: 10%;
`;

const Id = styled.th`
  width: 10%;
`;

const Gender = styled.th`
  width: 30%;
`;

const Birthday = styled.th`
  width: 40%;
`;

export default function ChildrenListOfSelectedUser({ userChildren }) {
  return (
    <div>
      <Title>아이정보</Title>
      <Wrapper>
        {userChildren.length ? (
          <table>
            <thead>
              <tr>
                <Number>No.</Number>
                <SelectBox>선택</SelectBox>
                <Id>아이정보 고유번호</Id>
                <Gender>성별</Gender>
                <Birthday>생일</Birthday>
              </tr>
            </thead>
            <tbody>
              {userChildren.map((child, index) => (
                <tr key={child.id}>
                  <td>{userChildren.length - index}</td>
                  <td><input type="checkbox" /></td>
                  <td>{child.id}</td>
                  <td>{child.gender}</td>
                  <td>{child.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>등록된 아이 정보가 없습니다.</p>
        )}
      </Wrapper>
    </div>
  );
}
