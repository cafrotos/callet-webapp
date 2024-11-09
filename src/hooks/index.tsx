import { query, collection, where, limit, startAfter, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "src/utils/firebase";
import { useAuth } from "./useAuth";

// Tạo hook generic với type T
export const useRead = <T extends { id?: string }>(collectionName: string) => {
  const [data, setData] = useState<Array<T>>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const { userId } = useAuth();

  const loadMore = () => {
    if (lastVisible) {
      const q = query(
        collection(db, collectionName),
        where("userId", "==", userId),
        limit(20),
        startAfter(lastVisible)
      );
      onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map(
          (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as unknown as T)
        );
        setData((prev) => [...prev, ...newData]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, collectionName),
        where("userId", "==", userId),
        limit(20)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map(
          (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as unknown as T)
        );
        setData(newData);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userId, collectionName]);

  return { data, loading, loadMore };
};