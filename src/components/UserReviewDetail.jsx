import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
    padding: 5em;
`;

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-bottom: 3em;
`;

const ReviewId = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const Nickname = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const DateOfWritten = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-block: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }
`;

const DateOfVisit = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-block: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }
`;

const PlaceName = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-bottom: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }  
`;

const Rate = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-bottom: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const Body = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-bottom: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

export default function UserReviewDetail({ userReview, toggleModal, goToPrevPage }) {
  const handleOpenModalClick = () => {
    toggleModal();
  };

  const handlePageBackClick = () => {
    goToPrevPage();
  };

  return (
    <Container>
      {Object.keys(userReview).length ? (
        <div>
          <Title>리뷰 상세정보</Title>
          <Wrapper>
            <ReviewId>
              <p>리뷰 고유번호</p>
              <p>{userReview.id}</p>
            </ReviewId>
            <Nickname>
              <p>작성자 닉네임</p>
              <span>{userReview.nickname}</span>
            </Nickname>
            <DateOfWritten>
              <p>작성일</p>
              <p>{dateFormatter(userReview.createdAt)}</p>
            </DateOfWritten>
            <DateOfVisit>
              <p>방문일</p>
              <p>{dateFormatter(userReview.dateOfVisit)}</p>
            </DateOfVisit>
            <PlaceName>
              <p>방문 장소</p>
              <p>{userReview.placeName}</p>
            </PlaceName>
            <Rate>
              <p>평점</p>
              <p>{userReview.rate}</p>
            </Rate>
            <Body>
              <p>내용</p>
              <p>{userReview.body}</p>
            </Body>
            <button type="button" onClick={handleOpenModalClick}>삭제하기</button>
            <button type="button" onClick={handlePageBackClick}>뒤로가기</button>
          </Wrapper>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </Container>
  );
}
