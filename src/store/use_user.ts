import { create } from "zustand";
import { User } from "../types";
import axios from "../services/axios_config";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";

interface UsersState {
  users: User[];
  isFetched: boolean;

  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  addUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  isFetched: false,

  fetchUsers: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("mjx_token");

    try {
      const response = await axios.get(`${END_POINT_API?.USER?.BASE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fetchedUsers = response.data;
      set({ users: fetchedUsers, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch users");
    }
  },

  fetchUserById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.USER?.BY_ID(id)}`);

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch user");
    }
  },

  addUser: async (user) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const response = await axios.post(`${END_POINT_API?.USER?.BASE}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newUser = response.data;

      if (newUser.success) {
        toastSuccess(newUser.message || "User added successfully");

        set((state) => ({
          users: [...state.users, newUser.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add user");
    }
  },

  updateUser: async (id, user) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const resp = await axios.put(`${END_POINT_API?.USER?.BY_ID(id)}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Package updated successfully");

        set((state) => ({
          users: state.users.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const resp = await axios.delete(`${END_POINT_API?.USER?.BY_ID(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success) {
        toastSuccess(resp.data.message || "User deleted successfully");

        set((state) => ({
          users: state.users.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete user");
    }
  },
}));

export default useUsersStore;
