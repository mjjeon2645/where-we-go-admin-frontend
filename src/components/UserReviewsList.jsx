import styled from 'styled-components';

import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
  margin-top: 3em;
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

  button {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #DDD;
  }
`;

const Number = styled.th`
  width: 5%;
`;

const CreatedAt = styled.th`
  width: 17%;
`;

const Nickname = styled.th`
  width: 12%;
`;

const Body = styled.th`
  width: 43%;
`;

const Rate = styled.th`
  width: 5%;
`;

const Place = styled.th`
  width: 28%;
`;

export default function UserReviewsList({
  allUserReviews, selectedUserDetailPage, selectedReviewDetailPage, selectedPlaceDetailPage,
}) {
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
              {allUserReviews.map((review, index) => (
                <tr key={review.id}>
                  <td>{allUserReviews.length - index}</td>
                  <td>{dateFormatter(review.createdAt)}</td>
                  <td>
                    <button type="button" onClick={() => handleUserDetailClick(review.userId)}>
                      {review.nickname}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleUserReviewDetailClick(review.id)}>
                      {review.body}
                    </button>
                  </td>
                  <td>{review.rate}</td>
                  <td>
                    <button type="button" onClick={() => handlePlaceDetailClick(review.placeId)}>
                      {review.placeName}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>작성된 사용자 리뷰가 없습니다.</p>
      )}
    </Container>
  );
}
