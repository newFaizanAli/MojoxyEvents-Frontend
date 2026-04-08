export interface ArtistAchievement {
  name: string;
  for: string;
  year: string;
}

export interface ArtistGallery {
  type: "photo" | "video";
  link: string;
}

export interface ArtistLanguage {
  name: string;
}

export interface ArtistUser {
  _id: string;
  name: string;
}

export interface ArtistCategory {
  _id: string;
  name: string;
}

export interface Artist {
  _id?: string;
  stage_name: string;
  user: ArtistUser | null;
  category: ArtistCategory | null;
  is_travel_flexible: boolean;
  short_desc: string;
  img_link: File | string;
  story_img_link: File | string;
  bio: string;
  gender: string;
  gallery: ArtistGallery[];
  performing_members: number;
  offstage_members: number;
  achievements: ArtistAchievement[];
  genres: string[];
  event_types: string[];
  perform_locations: string[];
  languages: ArtistLanguage[];
}

export type ArtistFormData = Omit<Artist, "_id" | "user" | "category"> & {
  user?: string | null;
  category?: string | null;
};
