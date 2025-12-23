import { db } from '@/lib/firebase';
import { collection,addDoc } from 'firebase/firestore';

export const subscribeToNewsletter = async (email: string) => {
  try {
    const subsRef = collection(db, 'subscribers');
    await addDoc(subsRef, {
      email: email,
      date: new Date().toISOString(),
      status: 'active'
    });
    return { success: true };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false };
  }
};