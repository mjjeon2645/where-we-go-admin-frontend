import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InformationOfSelectedUser from './InformationOfSelectedUser';
import ChildrenListOfSelectedUser from './ChildrenListOfSelectedUser';
import UserReviewsListOfSelectedUser from './UserReviewsListOfSelectedUser';
import BookmarksListOfSelectedUser from './BookmarksListOfSelectedUser';
import DeleteUserModal from './DeleteUserModal';
import useUserStore from '../hooks/useUserStore';

export default function UserDetail({
  user, userChildren, bookmarks, userReviews, adminId, employeeIdentificationNumber,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const userStore = useUserStore();

  const { errorMessage } = userStore;

  const navigate = useNavigate();

  const userId = document.location.pathname.split('/')[2];

  const deleteUser = async () => {
    const response = await userStore.deleteSelectedUser(userId);
    if (!response) {
      return;
    }

    userStore.clearDeleteState();
    userStore.clearError();
    setIsOpen(!isOpen);
    navigate('/users');
  };

  const toggleModal = () => {
    userStore.clearError();
    setIsOpen(!isOpen);
  };

  const setDeleteReason = (reason) => {
    userStore.setDeleteReason(reason);
  };

  const setAdminPassword = (password) => {
    userStore.setAdminPassword(password);
  };

  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <div>
          <InformationOfSelectedUser user={user} toggleModal={toggleModal} />
          <ChildrenListOfSelectedUser userChildren={userChildren} />
          <UserReviewsListOfSelectedUser userReviews={userReviews} />
          <BookmarksListOfSelectedUser bookmarks={bookmarks} />
          <DeleteUserModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            deleteUser={deleteUser}
            setDeleteReason={setDeleteReason}
            adminId={adminId}
            employeeIdentificationNumber={employeeIdentificationNumber}
            setAdminPassword={setAdminPassword}
            errorMessage={errorMessage}
          />
        </div>
      ) : (
        <div>now loading...</div>
      )}
    </div>
  );
}
