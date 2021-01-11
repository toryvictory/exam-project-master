import React from 'react';

const ImageUpload = (props) => {
  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    const {
      input: { onChange },
    } = props;
    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file?.type.match(imageType)) {
      e.target.value = '';
    } else {
      onChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Supports only images (*.png, *.gif, *.jpeg)</span>
        <input
          id="file"
          name="file"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="file">Choose file</label>
      </div>
      <img id="imagePreview" className={imgStyle} alt="" />
    </div>
  );
};

export default ImageUpload;
