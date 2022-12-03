import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
  margin-bottom: 3em;
`;

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Number = styled.th`
  width: 5%;
`;

const SelectBox = styled.th`
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
  width: 20%;
`;

export default function UserReviewsListOfSelectedUser({ userReviews }) {
  return (
    <Container>
      <Title>작성한 리뷰 목록</Title>
      {userReviews.length ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>선택</th>
              <th>작성일</th>
              <th>작성자 닉네임</th>
              <th>내용</th>
              <th>평점</th>
              <th>장소명</th>
            </tr>
          </thead>
          <tbody>
            {userReviews.map((review, index) => (
              <tr key={review.id}>
                <Number>{userReviews.length - index}</Number>
                <SelectBox><input type="checkbox" /></SelectBox>
                <CreatedAt>{dateFormatter(review.createdAt)}</CreatedAt>
                <Nickname>
                  {review.nickname}
                </Nickname>
                <Body>
                  {review.body}
                </Body>
                <Rate>{review.rate}</Rate>
                <Place>
                  {review.placeName}
                </Place>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>등록한 리뷰가 없습니다.</p>
      )}
    </Container>
  );
}
