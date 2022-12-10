import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { todayFormatter } from '../utils/dateFormatter';

const StyledModal = Modal.styled`
  position: relative;
  width: 25em;
  height: 24em;
  
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
    p {
        margin-block: .3em;
    }
`;

const Reason = styled.label`
  display: block;
`;

const Password = styled.label`
  display: block;
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
    background-color: #054468;
    margin-inline: .3em;
    padding: .5em .7em;
    border: none;
    border-radius: 4px;
  `;

const Error = styled.p`
  color: #ff0000;
`;

export default function DeleteReviewModal({
  isOpen, toggleModal, deleteReview, setDeleteReason, adminId,
  employeeIdentificationNumber, setAdminPassword, errorMessage,
}) {
  const date = new Date();
  const today = todayFormatter(date);

  const handleDeleteReviewClick = () => {
    deleteReview();
  };

  const closeModal = () => {
    toggleModal();
  };

  const handleDeleteReasonChange = (event) => {
    setDeleteReason(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <Title>리뷰를 삭제합니다.</Title>
      <Content>
        <p>
          담당자 ID:
          {' '}
          {adminId}
        </p>
        <p>
          담당자 사번:
          {' '}
          {employeeIdentificationNumber}
        </p>
        <p>
          삭제일:
          {' '}
          {today}
        </p>
        <Reason htmlFor="reason">사유:</Reason>
        <TextField
          id="reason"
          type="text"
          onChange={handleDeleteReasonChange}
        />
        <Password htmlFor="admin-password">비밀번호:</Password>
        <input
          id="admin-password"
          type="password"
          onChange={handleAdminPasswordChange}
        />
        {errorMessage && (<Error>{errorMessage}</Error>)}
      </Content>
      <CloseButton type="button" onClick={closeModal}>X</CloseButton>
      <DirectionButtons>
        <Delete type="button" onClick={handleDeleteReviewClick}>삭제</Delete>
      </DirectionButtons>
    </StyledModal>
  );
}
