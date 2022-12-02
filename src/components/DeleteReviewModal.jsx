import styled from 'styled-components';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
  position: relative;
  width: 25em;
  height: 18em;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-block: 2em;

  background-color: #FFF;
  border: 1px white solid;
  border-radius: 8px;
  `;

const Title = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: .6em;
`;

const Content = styled.div`
    /* text-align: center; */
    p {
        margin-block: .2em;
    }
`;

const TextField = styled.textarea`
    width: 300px;
    height: 80px;
    resize: none;
`;

const DirectionButtons = styled.div`
    display: flex;
    margin-top: 1em;
  `;

const CloseButton = styled.button`
    font-size: 1.2em;
    color: #BBB;
    position: absolute;
    top: 10%;
    right: 5%;
    background: none;
    border: none;
  `;

const Delete = styled.button`
    font-size: 1em;
    color: #FFF;
    background-color: #ff9d13;
    margin-inline: .3em;
    padding: .5em .7em;
    border: none;
    border-radius: 4px;
  `;

export default function DeleteReviewModal({
  isOpen, toggleModal, deleteReview, setDeleteReason,
}) {
  const handleDeleteReviewClick = () => {
    deleteReview();
  };

  const closeModal = () => {
    toggleModal();
  };

  const handleDeleteReasonChange = (event) => {
    setDeleteReason(event.target.value);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <Title>리뷰를 삭제합니다.</Title>
      <Content>
        <p>담당자: ~~~ 여기 아이디 들어가야함~~~</p>
        <p>삭제일: ~~~ 여기 날짜 들어가야함~~~</p>
        <p>사유:</p>
        <TextField
          type="text"
          onChange={handleDeleteReasonChange}
        />
      </Content>
      <CloseButton type="button" onClick={closeModal}>X</CloseButton>
      <DirectionButtons>
        <Delete type="button" onClick={handleDeleteReviewClick}>삭제하기</Delete>
      </DirectionButtons>
    </StyledModal>
  );
}
