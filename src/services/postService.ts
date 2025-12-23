import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { Post } from '@/types';

// 1. Obtener todos los posts (Home)
export const getPosts = async (maxLimit: number = 10): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('date', 'desc'), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
};

// 2. Obtener un post por su slug (Página individual)
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Post;
  } catch (error) {
    console.error("Error fetching post by slug: ", error);
    return null;
  }
};

// 3. BUSCADOR Y FILTRO DE CATEGORÍAS
export const searchPosts = async (searchTerm: string): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postsRef);
    
    const allPosts = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Post[];
    
    // Si no hay término de búsqueda, devolvemos todo
    if (!searchTerm) return allPosts;

    const lowerQuery = searchTerm.toLowerCase().trim();
    
    return allPosts.filter(post => {
      // Usamos encadenamiento opcional (?.) y "|| ''" para evitar errores si falta un campo
      const title = (post.title || '').toLowerCase();
      const category = (post.category || '').toLowerCase();
      const description = (post.description || '').toLowerCase();

      return (
        title.includes(lowerQuery) ||
        category.includes(lowerQuery) ||
        description.includes(lowerQuery)
      );
    });
  } catch (error) {
    console.error("Error searching posts: ", error);
    return [];
  }
};

// 4. SUSCRIPCIÓN AL NEWSLETTER
export const subscribeToNewsletter = async (email: string) => {
  try {
    const { addDoc, serverTimestamp } = await import('firebase/firestore');
    const subsRef = collection(db, 'subscribers');
    await addDoc(subsRef, {
      email: email,
      timestamp: serverTimestamp(),
      status: 'active'
    });
    return { success: true };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false };
  }
};