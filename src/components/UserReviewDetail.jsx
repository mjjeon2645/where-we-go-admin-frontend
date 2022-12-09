import styled from 'styled-components';

import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
  margin-top: 3em;
`;

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-bottom: 3em;
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }
`;

const LastSection = styled.section`
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

const Buttons = styled.div`
  text-align: center;
  margin-top: 5em;
`;

const DeleteButton = styled.button`
  color: #FFF;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 30px;
  background-color: #054468;
`;

const BackButton = styled.button`
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 30px;
  background-color: #DDD;
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
      {Object.keys(userReview).length !== 0 ? (
        <div>
          <Wrapper>
            <Section>
              <p>리뷰 고유번호</p>
              <p>{userReview.id}</p>
            </Section>
            <Section>
              <p>작성자 닉네임</p>
              <p>{userReview.nickname}</p>
            </Section>
            <Section>
              <p>작성일</p>
              <p>{dateFormatter(userReview.createdAt)}</p>
            </Section>
            <Section>
              <p>방문일</p>
              <p>{dateFormatter(userReview.dateOfVisit)}</p>
            </Section>
            <Section>
              <p>방문 장소</p>
              <p>{userReview.placeName}</p>
            </Section>
            <Section>
              <p>평점</p>
              <p>{userReview.rate}</p>
            </Section>
            <LastSection>
              <p>내용</p>
              <p>{userReview.body}</p>
            </LastSection>
            <Buttons>
              <DeleteButton type="button" onClick={handleOpenModalClick}>삭제하기</DeleteButton>
              <BackButton type="button" onClick={handlePageBackClick}>뒤로가기</BackButton>
            </Buttons>
          </Wrapper>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </Container>
  );
}
