import React, { useState } from 'react';

import { Icon, Button } from '..';
import { useChangeDocumentTitle } from '../../hooks';
import { postsApi } from '../../services/api/';
import { uploadImage } from '../../utils/';
import './UploadImage.scss';

const UploadImages = ({ hide }) => {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(0);
  const [postText, setPostText] = useState('');
  const handleChangeTextArea = (e) => {
    setPostText(e.target.value);
  };

  useChangeDocumentTitle('Создание • not-Instagram');

  const onChangeFileInput = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];

      if (file) {
        const fileObj = new Blob([file]);
        setImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  };

  const imageHandler = (i) => {
    setImagePreview(i);
  };

  const removeImage = () => {
    const copyArr = [...images];
    copyArr.splice(imagePreview, 1);
    setImages(copyArr);
    setImagePreview(0);
  };

  const submitPost = async () => {
    let result = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const { url } = await uploadImage(file);
      result.push(url);
    }
    postsApi.sendPost({ text: postText, images: result });
    setPostText('');
    hide();
  };

  return (
    <div className="upload__wrapper">
      <div className="upload__top">
        <div className="upload__top__empty-block"></div>
        <h1>Новая публикация</h1>
        <div className="upload__top__close-button" onClick={() => hide()}>
          <Button variant="transparent" />
          <Icon name="close" size="24" />
        </div>
      </div>

      <div className="upload__content">
        <div className="upload__left">
          {images.length === 0 ? (
            <form
              encType="multipart/form-data"
              method="POST"
              role="presentation">
              <input
                onChange={onChangeFileInput}
                type="file"
                id="upload-input"
                style={{ display: 'none' }}
              />
              <label htmlFor="upload-input">
                <Icon name="addMedia" size="97" className="d-flex" />
                Выбрать фото
              </label>
            </form>
          ) : (
            <div className="upload__content__image">
              <div className="upload__content__image__full">
                <div
                  className="upload__content__image__full__preview"
                  style={
                    images && {
                      backgroundImage: `url(${images[imagePreview].blobUrl})`,
                    }
                  }>
                  <div
                    className="upload__content__image__full__remove"
                    onClick={removeImage}>
                    <Icon name="clear" size="24" />
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="upload__content__image__list">
                {images.map((obj, i) => (
                  <div
                    onClick={() => imageHandler(i)}
                    key={obj.blobUrl + i}
                    className="upload__content__image__item">
                    <div
                      className="upload__content__image__item__preview"
                      style={
                        imagePreview !== i
                          ? {
                              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${obj.blobUrl})`,
                            }
                          : {
                              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${obj.blobUrl})`,
                            }
                      }></div>
                  </div>
                ))}
                <input
                  onChange={onChangeFileInput}
                  type="file"
                  id="upload-input"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="upload-input"
                  className="upload__content__image__item-add">
                  <Icon name="plus" size="22" />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="upload__right">
          <div>
            <textarea
              value={postText}
              onChange={handleChangeTextArea}
              placeholder="Добавьте подпись..."
              className="lFzco"
              autoComplete="off"
              autoCorrect="off"></textarea>
          </div>
          <div style={{ minHeight: '76px', padding: '16px' }}>
            <Button variant="primary" onClick={submitPost}>
              Поделиться
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
