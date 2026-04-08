export interface CategGenre {
  genre: string;
  name: string;
}

export interface Category {
  _id?: string;
  slug?: string;
  name: string;
  description: string;
  genres: CategGenre[];
  img_link: File | string;
}

export type CategoryFormData = Omit<Category, "_id">;
