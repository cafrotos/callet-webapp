import { db, storage } from "src/utils/firebase"; // Import db từ firebase.ts
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { IInvoice } from "src/types/invoice";
import { useAuth } from "./useAuth"; // Import useAuth
import { useRead } from ".";

import { groupBy } from 'lodash';
import dayjs from "dayjs";
import { ref, uploadBytes } from "firebase/storage";

export const useReadInvoices = () => {
  const { data: invoices, loading, loadMore: loadMoreInvoices } =
    useRead<IInvoice>("invoices");

  const groupedInvoices = groupBy(invoices, (invoice) => dayjs(invoice.createdAt).format("DD/MM/YYYY"));

  const formattedInvoices = Object.keys(groupedInvoices).map((date) => ({
    title: date,
    data: groupedInvoices[date],
  }));

  return { invoices: formattedInvoices, loading, loadMoreInvoices };
};

export const useWriteInvoices = () => {
  const { userId } = useAuth(); // Sử dụng useAuth để lấy userId

  const addInvoice = async (invoice: Pick<IInvoice, "imageUrl">) => {
    await addDoc(collection(db, "invoices"), {
      ...invoice,
      userId,
      createdAt: new Date(),
    });
  };

  const addInvoiceByImg = async (file: any) => {
    const storageRef = ref(storage, file.uid);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    }).catch(err => console.log(err));
  }

  return { addInvoice, addInvoiceByImg };
};
