export default function UserReviewsList({ allUserReviews }) {
  return (
    <div>
      {allUserReviews.length ? (
        <ul>
          {allUserReviews.map((review) => (
            <li key={review.id}>
              <p>{review.userId}</p>
              <p>{review.nickname}</p>
              <p>{review.body}</p>
              <p>{review.rate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>now loading...</p>
      )}
      hi
    </div>
  );
}
