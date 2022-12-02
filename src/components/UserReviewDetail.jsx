import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';

const Container = styled.div`
    padding: 3em;
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
          <table>
            <tr>
              <th>리뷰 고유번호</th>
              <td />
              <td>{userReview.id}</td>
            </tr>
            <tr>
              <th>작성자 닉네임</th>
              <td />
              <td>{userReview.nickname}</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td />
              <td>{dateFormatter(userReview.createdAt)}</td>
            </tr>
            <tr>
              <th>방문일</th>
              <td />
              <td>{userReview.dateOfVisit}</td>
            </tr>
            <tr>
              <th>방문 장소</th>
              <td />
              <td>장소 이름 들어가야함~</td>
            </tr>
            <tr>
              <th>평점</th>
              <td />
              <td>{userReview.rate}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td />
              <td>{userReview.body}</td>
            </tr>
          </table>
          <button type="button" onClick={handleOpenModalClick}>삭제하기</button>
          <button type="button" onClick={handlePageBackClick}>뒤로가기</button>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </Container>
  );
}
