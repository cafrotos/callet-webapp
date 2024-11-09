import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { InvoiceStatus } from "src/types/invoice";

export const renderOcrTag = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.Success:
      return (
        <Tag icon={<CheckCircleOutlined />} color={status}>
          Thành công
        </Tag>
      )
    case InvoiceStatus.Processing:
      return (
        <Tag icon={<SyncOutlined spin />} color={status}>
          Đang xử lý
        </Tag>
      )
    default:
      break;
  }
}