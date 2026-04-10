import { create } from "zustand";
import axios from "../services/axios_config";
import { Artist } from "../types";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";
import { artistParseOrAppend } from "../utilities/functions";

interface ArtistState {
  artists: Artist[];
  isFetched: boolean;
  isArtistProfileFetched: boolean;
  artistProfile: Artist | null;
  fetchArtists: () => Promise<void>;
  fetchArtistProfile: () => Promise<Artist | null>;
  addArtist: (artist: Omit<Artist, "_id">) => Promise<void>;
  fetchArtistByStageName: (stage_name: string) => Promise<Artist | null>;
  fetchArtistBookingDetails: (artistId: string) => Promise<string[] | null>;
  updateArtist: (id: string, artist: Partial<Artist>) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
}

const useArtistStore = create<ArtistState>((set, get) => ({
  artists: [],
  isFetched: false,

  isArtistProfileFetched: false,
  artistProfile: null,

  fetchArtists: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.ARTISTS?.BASE}`);

      set({ artists: response.data, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
    }
  },

  fetchArtistByStageName: async (stage_name: string) => {
    try {
      const response = await axios.get(
        `${END_POINT_API?.ARTISTS?.BY_STAGE_NAME(stage_name)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
    }
  },

  fetchArtistProfile: async () => {
    try {
      const response = await axios.get(
        `${END_POINT_API?.ARTISTS?.BASE}/profile`,
      );

      set({
        artistProfile: response.data,
        isArtistProfileFetched: true,
      });

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
      return null;
    }
  },

  fetchArtistBookingDetails: async (artistId: string) => {
    try {
      if (artistId) {
        const response = await axios.get(
          `${END_POINT_API?.ARTISTS?.BOOKING_DETAIL(artistId)}`,
        );

        return Array.isArray(response.data) ? response.data : [];
      }
      return null;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
      return null;
    }
  },

  addArtist: async (artist: Artist) => {
    const token = localStorage.getItem("mjx_token");

    try {
      const formData = new FormData();

      for (const key of Object.keys(artist) as (keyof Artist)[]) {
        artistParseOrAppend(formData, key, artist[key]);
      }

      const response = await axios.post(
        `${END_POINT_API?.ARTISTS?.BASE}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newArtist = response.data;
      if (newArtist.success) {
        toastSuccess(newArtist.message || "Artist added successfully");
        set((state) => ({
          artists: [...state.artists, newArtist.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add artist");
    }
  },

  updateArtist: async (id, artist) => {
    const token = localStorage.getItem("mjx_token");
    try {
      const formData = new FormData();

      for (const key of Object.keys(artist) as (keyof Artist)[]) {
        artistParseOrAppend(formData, key, artist[key]);
      }

      const resp = await axios.put(
        `${END_POINT_API?.ARTISTS?.BY_ID(id)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Artist updated successfully");

        set((state) => ({
          artists: state.artists.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
    }
  },

  deleteArtist: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API?.ARTISTS?.BY_ID(id)}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Artist deleted successfully");
        set((state) => ({
          artists: state.artists.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist");
    }
  },
}));

export default useArtistStore;
