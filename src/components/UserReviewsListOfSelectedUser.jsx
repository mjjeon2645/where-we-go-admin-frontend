import styled from 'styled-components';

import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
  margin-bottom: 5em;
`;

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
  width: 5%;
`;

const CreatedAt = styled.th`
  width: 10%;
`;

const Nickname = styled.th`
  width: 15%;
`;

const Body = styled.th`
  width: 40%;
`;

const Rate = styled.th`
  width: 5%;
`;

const Place = styled.th`
  width: 25%;
`;

export default function UserReviewsListOfSelectedUser({ userReviews }) {
  return (
    <Container>
      <Title>작성한 리뷰 목록</Title>
      {userReviews.length ? (
        <Table>
          <thead>
            <tr>
              <Number>No.</Number>
              <CreatedAt>작성일</CreatedAt>
              <Nickname>작성자 닉네임</Nickname>
              <Body>내용</Body>
              <Rate>평점</Rate>
              <Place>장소명</Place>
            </tr>
          </thead>
          <tbody>
            {userReviews.map((review, index) => (
              <tr key={review.id}>
                <td>{userReviews.length - index}</td>
                <td>{dateFormatter(review.createdAt)}</td>
                <td>
                  {review.nickname}
                </td>
                <td>
                  {review.body}
                </td>
                <td>{review.rate}</td>
                <td>
                  {review.placeName}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </Container>
  );
}
