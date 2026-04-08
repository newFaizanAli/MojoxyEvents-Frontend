import { create } from "zustand";
import axios from "../services/axios_config";
import { Category } from "../types";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";

interface CategoryState {
  categories: Category[];
  isFetched: boolean;

  fetchCategories: () => Promise<void>;
  fetchCategoryBySlug: (slug: string) => Promise<Category | null>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isFetched: false,

  fetchCategories: async () => {
    const { isFetched } = get();
    if (isFetched) return;
    try {
      const response = await axios.get(`${END_POINT_API?.CATEGORY?.BASE}`);

      const fetchedCategories = response.data;
      set({ categories: fetchedCategories, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch categories");
    }
  },

  fetchCategoryBySlug: async (slug: string) => {
    try {
      const response = await axios.get(
        `${END_POINT_API?.CATEGORY?.SLUG(slug)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch category");
    }
  },

  addCategory: async (category) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const formData = new FormData();

      for (const key of Object.keys(category) as (keyof Category)[]) {
        const k = key;
        const value = category[k];

        if (k === "genres") {
          formData.append(k, JSON.stringify(value));
        } else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const response = await axios.post(
        `${END_POINT_API?.CATEGORY?.BASE}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newCategory = response.data;

      if (newCategory.success) {
        toastSuccess(newCategory.message || "Category added successfully");
        set((state) => ({
          categories: [...state.categories, newCategory.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add event");
    }
  },

  updateCategory: async (id, category) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const formData = new FormData();

      for (const key of Object.keys(category) as (keyof Category)[]) {
        const k = key;
        const value = category[k];
        if (k === "genres") {
          formData.append(k, JSON.stringify(value));
        } else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const resp = await axios.put(
        `${END_POINT_API?.CATEGORY?.BY_ID(id)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Category updated successfully");

        set((state) => ({
          categories: state.categories.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update category");
    }
  },

  deleteCategory: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API?.CATEGORY?.BY_ID(id)}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Booking deleted successfully");

        set((state) => ({
          categories: state.categories.filter(
            (u) => String(u._id) !== String(id),
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete category");
    }
  },
}));

export default useCategoryStore;
