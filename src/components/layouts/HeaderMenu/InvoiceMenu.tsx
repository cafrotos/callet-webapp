import { Button, Space, Upload } from "antd"
import { useWriteInvoices } from "src/hooks/useInvoices"

export const InvoiceMenu = () => {
  const { addInvoiceByImg } = useWriteInvoices()
  return (
    <Space direction="horizontal">
      <Upload accept="image/*" customRequest={(options: any) => addInvoiceByImg(options.file)}>
        <Button>
          Thêm hoá đơn
        </Button>
      </Upload>
    </Space>
  )
}