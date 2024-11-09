import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
      extra={
        <Button
          type="primary"
          onClick={() => navigate('/')}
        >
          Trở về trang chủ
        </Button>
      }
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: '',
        alignItems: 'center'
      }}
    />
  );
};

export default NotFoundPage;
