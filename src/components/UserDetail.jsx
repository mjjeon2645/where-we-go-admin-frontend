import InformationOfSelectedUser from './InformationOfSelectedUser';
import ChildrenListOfSelectedUser from './ChildrenListOfSelectedUser';
import UserReviewsListOfSelectedUser from './UserReviewsListOfSelectedUser';
import BookmarksListOfSelectedUser from './BookmarksListOfSelectedUser';

export default function UserDetail({
  user, userChildren, bookmarks, userReviews, deleteSelectedUser,
}) {
  const deleteUser = (userId) => {
    deleteSelectedUser(userId);
  };

  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <div>
          <InformationOfSelectedUser user={user} deleteUser={deleteUser} />
          <ChildrenListOfSelectedUser userChildren={userChildren} />
          <UserReviewsListOfSelectedUser userReviews={userReviews} />
          <BookmarksListOfSelectedUser bookmarks={bookmarks} />
        </div>
      ) : (
        <div>now loading...</div>
      )}
    </div>
  );
}
