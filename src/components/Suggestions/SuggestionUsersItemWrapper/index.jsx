import SuggestionUsersItem from '../SuggestionUsersItem';
import { SuggestionsLoader } from '../..';

const SuggestionUsersItemWrapper = ({ users, currentUserId }) => {
  return (
    <div className="suggestions__users">
      <div className="suggestions__users__header">
        <span>Рекомендации для вас</span>
        <span></span>
      </div>
      {!users.length ? (
        <SuggestionsLoader />
      ) : (
        users.map((user) => (
          <SuggestionUsersItem
            key={user._id}
            username={user.username}
            profileAvatar={user.profileAvatar}
            fullname={user.fullname}
            userId={user._id}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
};

export default SuggestionUsersItemWrapper;
