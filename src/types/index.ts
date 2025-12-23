export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
  description: string;
  content: string;
  authorName?: string;    
  authorHandle?: string;  
  authorImage?: string;   
}