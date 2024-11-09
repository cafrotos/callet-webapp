export enum InvoiceStatus {
  Processing = "processing",
  Success = "success"
}

export interface IInvoice {
  id?: string;
  userId: string;
  createdAt: Date;
  imageUrl: string;
  status: InvoiceStatus
}

export interface ITransaction {
  id?: string;
  vendor: IVendor;
  value: number;
  discount: number;
  items: IItem[];
  boughtAt: Date;
  manualCorrections?: Partial<ITransaction>;
}

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface IVendor {
  tags: string[];
  name: string;
  address?: string;
}