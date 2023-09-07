import React, { FC, useRef, useState } from 'react';
import { Button } from 'antd';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { ResultAccount } from 'app/Models';
interface Prop {
  value?: File | string | null;
  name: string;
  onChange: (...event: any[]) => void;
  disabled?: boolean;
  account?: ResultAccount | null;
}

const ImageInput: FC<Prop> = ({ value, name, onChange }) => {
  const hiddenFileInput = useRef<any>(null);
  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  const [urlImage, setUrlImage] = useState(value);

  const onChangeImage = (event: any) => {
    const data = event.target.files[0];
    if (data) {
      const urlImage = URL.createObjectURL(data);
      setUrlImage(urlImage);
      onChange(data);
    }
  };

  return (
    <div className="avatar_area">
      <Avatar src={urlImage} icon={<UserOutlined />} className="avatar" />
      <Button
        shape="circle"
        icon={<CameraOutlined className="iconBtnUpload" />}
        className="buttonUpload"
        onClick={handleClick}
      />
      <input
        ref={hiddenFileInput}
        className="hiden w-100 buttonUpload"
        type="file"
        id="filePicker"
        name={name}
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={onChangeImage}
      />
    </div>
  );
};
export default ImageInput;
