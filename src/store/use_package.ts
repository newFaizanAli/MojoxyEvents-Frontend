import axios from "../services/axios_config";
import { create } from "zustand";
import { Package } from "../types";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";

interface PackageState {
  artist_packages: Package[];
  isFetched: boolean;

  fetchPackages: () => Promise<void>;
  addPackage: (id: Omit<Package, "_id">) => Promise<void>;
  fetchPackageById: (id: string) => Promise<Package | null>;
  updatePackage: (
    id: string,
    artist_package: Partial<Package>,
  ) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
}

const usePackageStore = create<PackageState>((set, get) => ({
  artist_packages: [],
  isFetched: false,

  fetchPackages: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.PACKAGE?.BASE}`);

      set({ artist_packages: response.data, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch packages");
    }
  },

  fetchPackageById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.PACKAGE?.BY_ID(id)}`);

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch package");
    }
  },

  addPackage: async (artist_package) => {
    try {
      const response = await axios.post(
        `${END_POINT_API.PACKAGE.BASE}`,
        artist_package,
      );

      const newPackage = response.data;

      if (newPackage.success) {
        toastSuccess(newPackage.message || "Package added successfully");

        set((state) => ({
          artist_packages: [...state.artist_packages, newPackage.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch add package");
    }
  },

  updatePackage: async (id, artist_package) => {
    try {
      const resp = await axios.put(
        `${END_POINT_API.PACKAGE.BY_ID(id)}`,
        artist_package,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Package updated successfully");

        set((state) => ({
          artist_packages: state.artist_packages.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update package");
    }
  },

  deletePackage: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API.PACKAGE.BY_ID(id)}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Package deleted successfully");

        set((state) => ({
          artist_packages: state.artist_packages.filter(
            (u) => String(u._id) !== String(id),
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete package");
    }
  },
}));

export default usePackageStore;
