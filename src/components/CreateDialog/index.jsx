import { useEffect, useState } from 'react';

import { useChangeDocumentTitle, useDebounce } from '../../hooks';
import { dialogsApi, userApi } from '../../services/api';
import { Image } from '../';
import './CreateDialog.scss';
import { Button, Icon } from '..';

const CreateDialog = ({ hide }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [dialogIsFetching, setDialogIsFetching] = useState(false);

  const onSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchTerm('');
  };

  const onRemoveSelectedUser = (userId) => {
    const filteredUsers = selectedUsers.filter(
      (user) => user.userId !== userId,
    );
    setSelectedUsers(filteredUsers);
  };

  const createDialogs = () => {
    setDialogIsFetching(true);
    Promise.all(
      selectedUsers.map(({ userId }) => {
        return dialogsApi.create({ partner: userId });
      }),
    ).then(() => {
      setDialogIsFetching(false);
      setSelectedUsers([]);
      hide();
    });
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useChangeDocumentTitle('Новое сообщение • Direct');

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      userApi.findUsers(debouncedSearchTerm).then((res) => {
        setResults(res);
        setIsSearching(false);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="create-dialog">
      <div className="create-dialog__top">
        <div className="create-dialog__top__header">
          <div>
            <Button
              variant="transparent"
              className="create-dialog__button"
              onClick={hide}>
              <Icon name="close" size="19" />
            </Button>
          </div>
          <div>
            <h1>Новое сообщение</h1>
          </div>
          <div>
            <Button
              isLoading={dialogIsFetching}
              onClick={createDialogs}
              disabled={!selectedUsers.length}
              variant="primary--outline"
              className="create-dialog__button">
              Далее
            </Button>
          </div>
        </div>
        <div className="create-dialog__top__header__input">
          <h4>Кому:</h4>
          {selectedUsers.map((item) => (
            <div
              className="create-dialog__top__header__input__selected-user"
              key={item.userId}>
              <Button
                variant="transparent"
                onClick={() => onRemoveSelectedUser(item.userId)}>
                {item.username}
              </Button>
              <Button
                className="create-dialog__top__header__input__selected-user__remove"
                variant="transparent"
                onClick={() => onRemoveSelectedUser(item.userId)}>
                <Icon name="close" size="12" />
              </Button>
            </div>
          ))}
          <input
            value={searchTerm}
            placeholder="Поиск..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="create-dialog__bottom">
        {isSearching || !results.length ? (
          <div className="create-dialog__bottom__item--empty">
            Аккаунты не найдены.
          </div>
        ) : (
          results.map((user) => (
            <div
              className="create-dialog__bottom__item"
              key={user._id}
              onClick={() =>
                onSelectUser({ userId: user._id, username: user.username })
              }>
              <Image
                src={user.profileAvatar}
                alt="photo"
                circle
                width="44px"
                height="44px"
              />
              <div className="create-dialog__bottom__item__user">
                <span>{user.username}</span>
                <span>{user.fullname}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateDialog;
