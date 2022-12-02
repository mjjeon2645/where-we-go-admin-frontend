import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
  padding: 3em;
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

export default function UserReviewsList({
  allUserReviews, selectedUserDetailPage, selectedReviewDetailPage, selectedPlaceDetailPage,
}) {
  console.log(allUserReviews);

  const handleUserDetailClick = (userId) => {
    selectedUserDetailPage(userId);
  };

  const handleUserReviewDetailClick = (reviewId) => {
    selectedReviewDetailPage(reviewId);
  };

  const handlePlaceDetailClick = (placeId) => {
    selectedPlaceDetailPage(placeId);
  };

  return (
    <Container>
      {allUserReviews.length ? (
        <div>
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
              {allUserReviews.map((review, index) => (
                <tr key={review.id}>
                  <Number>{allUserReviews.length - index}</Number>
                  <SelectBox><input type="checkbox" /></SelectBox>
                  <CreatedAt>{dateFormatter(review.createdAt)}</CreatedAt>
                  <Nickname>
                    <button type="button" onClick={() => handleUserDetailClick(review.userId)}>
                      {review.nickname}
                    </button>
                  </Nickname>
                  <Body>
                    <button type="button" onClick={() => handleUserReviewDetailClick(review.id)}>
                      {review.body}
                    </button>
                  </Body>
                  <Rate>{review.rate}</Rate>
                  <Place>
                    <button type="button" onClick={() => handlePlaceDetailClick(review.placeId)}>
                      이름입니다
                    </button>
                  </Place>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </Container>
  );
}
