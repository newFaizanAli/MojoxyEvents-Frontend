import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useArtistStore,
  useCategoryStore,
  useProfileStore,
  useUsersStore,
} from "../store";
import {
  Artist,
  ArtistAchievement,
  ArtistFormData,
  ArtistGallery,
  ArtistLanguage,
} from "../types";

export function useArtistForm(stage_name_param: string | null) {
  const stage_name = stage_name_param;

  const { profile } = useProfileStore();
  const { addArtist, updateArtist, fetchArtistByStageName } = useArtistStore();
  const { users, isFetched: isUserFetched, fetchUsers } = useUsersStore();
  const {
    categories,
    isFetched: isCatFetched,
    fetchCategories,
  } = useCategoryStore();

  const role = profile?.role;

  const isArtistRole = role === "artist";

  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistLanguage, setArtistLanguage] = useState<ArtistLanguage[]>([]);
  const [artistGenres, setArtistGenres] = useState<string[]>([]);
  const [event_types, setEventTypes] = useState<string[]>([]);
  const [performLocations, setPerformLocations] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<ArtistAchievement[]>([]);
  const [artistGallery, setArtistGallery] = useState<ArtistGallery[]>([]);

  const defaultValues: ArtistFormData = {
    stage_name: "",
    user: null,
    category: null,
    img_link: "" as unknown as File | "",
    story_img_link: "" as unknown as File | "",
    performing_members: 1,
    offstage_members: 1,
    bio: "",
    short_desc: "",
    gender: "",
    is_travel_flexible: false,
    achievements: [],
    gallery: [],
    languages: [],
    event_types: [],
    genres: [],
    perform_locations: [],
  };

  const form = useForm<ArtistFormData>({ defaultValues });
  const { reset } = form;

  useEffect(() => {
    if (!isArtistRole) {
      if (!isUserFetched) fetchUsers();
    }
    if (!isCatFetched) fetchCategories();
  }, [isUserFetched, isCatFetched, fetchUsers, fetchCategories, isArtistRole]);

  useEffect(() => {
    const load = async () => {
      if (stage_name) {
        const fetched = await fetchArtistByStageName(stage_name);
        if (fetched) {
          setArtist(fetched);
          reset({
            ...fetched,
            user: fetched?.user?._id,
            category: fetched?.category?._id,
          });
          setArtistLanguage(fetched.languages ?? []);
          setEventTypes(fetched.event_types ?? []);
          setPerformLocations(fetched.perform_locations ?? []);
          setAchievements(fetched.achievements ?? []);
          setArtistGallery(fetched.gallery ?? []);
          setArtistGenres(fetched.genres ?? []);
        }
      } else if (isArtistRole) {
        setArtist(null);
        reset(defaultValues);
        setArtistLanguage([]);
        setArtistGenres([]);
        setEventTypes([]);
        setPerformLocations([]);
        setAchievements([]);
        setArtistGallery([]);
      }
    };
    load();
  }, [stage_name, fetchArtistByStageName, reset, isArtistRole]);

  // Generic tag helpers
  const addTag = <T>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    list: T[],
    value: T,
  ) => {
    if (!list.includes(value)) setter([...list, value]);
  };
  const removeTag = <T>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
  ) => setter((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = (data: ArtistFormData) => {
    const fullUser = users.find((e) => String(e._id) === String(data.user));
    const fullCategory = categories.find(
      (e) => String(e._id) === String(data.category),
    );

    const payload: Omit<Artist, "_id"> = {
      ...data,
      user: fullUser
        ? { _id: String(fullUser._id), name: fullUser.name }
        : null,
      category: fullCategory
        ? { _id: String(fullCategory._id), name: fullCategory.name }
        : null,
      languages: artistLanguage,
      event_types,
      genres: artistGenres,
      perform_locations: performLocations,
      achievements,
      gallery: artistGallery,
    };

    if (artist) updateArtist(artist._id as string, payload);
    else addArtist(payload);
  };

  return {
    artist,
    form,
    users,
    categories,
    onSubmit,
    artistLanguage,
    setArtistLanguage,
    artistGenres,
    setArtistGenres,
    event_types,
    setEventTypes,
    performLocations,
    setPerformLocations,
    achievements,
    setAchievements,
    artistGallery,
    setArtistGallery,
    addTag,
    removeTag,
    role,
    isArtistRole,
  };
}

export function useTagList(initial: string[], onChange: (v: string[]) => void) {
  const [selected, setSelected] = useState("");
  const add = () => {
    if (!selected || initial.includes(selected)) return;
    onChange([...initial, selected]);
    setSelected("");
  };
  const remove = (i: number) => onChange(initial.filter((_, idx) => idx !== i));
  return { selected, setSelected, add, remove };
}
