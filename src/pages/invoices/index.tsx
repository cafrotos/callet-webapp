import React from 'react';
import { Card, Space } from 'antd';
// import { useReadInvoices } from 'src/hooks/useInvoices';
import dayjs from 'dayjs';
import "./styles.css"
import { renderOcrTag } from './components/OCRTag';
import { IInvoice } from 'src/types/invoice';

const invoices = Array.from(new Array(10)).map((___, rindex) => ({
  createdAt: new Date(),
  id: rindex,
  imageUrl: "https://i.ex-cdn.com/nhadautu.vn/files/content/2020/04/13/tien-dien-1-1586621291545-0832.jpg",
  status: "processing"
} as unknown as IInvoice))

const InvoicesPage: React.FC = () => {
  // const { invoices } = useReadInvoices()
  return (
    <Space direction="vertical" size="small" className='invoices-page'>
      {invoices.map((card, index) => {
        const title = dayjs(card.createdAt).format("HH:mm DD/MM/YYYY"); // Lấy ngày từ invoice đầu tiên
        return (
          <Card
            title={title}
            key={card.id} // Giả sử mỗi invoice có id duy nhất
            hoverable
            cover={<img alt={card.imageUrl} src={card.imageUrl} className='inv-cover' />}
            extra={renderOcrTag(card.status)}
          />
        );
      })}
    </Space>
  );
};

export default InvoicesPage;