export interface ExtraIncludedPackage {
  title: string;
  price: string;
  description: string;
}
export interface PackageArtist {
  _id: string;
  stage_name: string;
}

export interface Package {
  _id?: string;
  artist: PackageArtist | null;
  title: string;
  description?: string;
  price: number;
  duration_minutes: number;
  capacity: number;
  extras: ExtraIncludedPackage[];
}

export type PackageFormData = Omit<Package, "_id" | "artist"> & {
  artist?: string | null;
};
