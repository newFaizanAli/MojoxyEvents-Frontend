import { City, Country } from "country-state-city";

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const OTPEXPIRETIME = 20;

// Location

export const COUNTRIES = Country.getAllCountries();
export const CITIES = City.getCitiesOfCountry("PK");

export const COUNTRIESLIST = COUNTRIES.map((country) => country.name);
export const CITIESLIST = CITIES?.map((city) => {
  return {
    label: city.name,
    value: city.name,
  };
});

export const EVENT_TYPES = [
  // Access Type
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Public",
    value: "public",
  },

  // Business & Professional
  {
    label: "Corporate",
    value: "corporate",
  },
  {
    label: "Conference",
    value: "conference",
  },
  {
    label: "Seminar",
    value: "seminar",
  },
  {
    label: "Workshop",
    value: "workshop",
  },
  {
    label: "Training Session",
    value: "training",
  },
  {
    label: "Networking Event",
    value: "networking",
  },
  {
    label: "Product Launch",
    value: "product_launch",
  },
  {
    label: "Job Fair / Career Expo",
    value: "job_fair",
  },
  {
    label: "Startup Pitch",
    value: "startup_pitch",
  },

  // Entertainment & Culture
  {
    label: "Concert",
    value: "concert",
  },
  {
    label: "Music Festival",
    value: "music_festival",
  },
  {
    label: "DJ Night",
    value: "dj_night",
  },
  {
    label: "Theatre / Drama",
    value: "theatre",
  },
  {
    label: "Comedy Show",
    value: "comedy",
  },
  {
    label: "Movie Premiere",
    value: "movie_premiere",
  },
  {
    label: "Art Exhibition",
    value: "art_exhibition",
  },
  {
    label: "Cultural Festival",
    value: "cultural_festival",
  },
  {
    label: "Fashion Show",
    value: "fashion_show",
  },

  // Sports & Fitness
  {
    label: "Cricket Match",
    value: "cricket",
  },
  {
    label: "Football Match",
    value: "football",
  },
  {
    label: "Badminton Tournament",
    value: "badminton",
  },
  {
    label: "Marathon / Run",
    value: "marathon",
  },
  {
    label: "Gym / Fitness Event",
    value: "fitness",
  },
  {
    label: "Esports Tournament",
    value: "esports",
  },

  // Personal & Social
  {
    label: "Wedding",
    value: "wedding",
  },
  {
    label: "Birthday Party",
    value: "birthday",
  },
  {
    label: "Anniversary",
    value: "anniversary",
  },
  {
    label: "Engagement",
    value: "engagement",
  },
  {
    label: "Family Gathering",
    value: "family_gathering",
  },
  {
    label: "Reunion",
    value: "reunion",
  },

  // Education & Learning
  {
    label: "School Event",
    value: "school",
  },
  {
    label: "College / University Event",
    value: "college",
  },
  {
    label: "Tech Talk",
    value: "tech_talk",
  },
  {
    label: "Hackathon",
    value: "hackathon",
  },
  {
    label: "Coding Bootcamp",
    value: "bootcamp",
  },

  // Religious & Community
  {
    label: "Religious Gathering",
    value: "religious",
  },
  {
    label: "Charity Event",
    value: "charity",
  },
  {
    label: "Fundraiser",
    value: "fundraiser",
  },
  {
    label: "Community Meetup",
    value: "community",
  },
  {
    label: "Political Rally",
    value: "political",
  },

  // Food & Lifestyle
  {
    label: "Food Festival",
    value: "food_festival",
  },
  {
    label: "Cooking Workshop",
    value: "cooking_workshop",
  },
  {
    label: "Wine Tasting",
    value: "wine_tasting",
  },
  {
    label: "Travel Meetup",
    value: "travel",
  },

  // Online / Hybrid
  {
    label: "Online Event",
    value: "online",
  },
  {
    label: "Webinar",
    value: "webinar",
  },
  {
    label: "Live Stream",
    value: "livestream",
  },
  {
    label: "Hybrid Event",
    value: "hybrid",
  },

  // Other
  {
    label: "Exhibition",
    value: "exhibition",
  },
  {
    label: "Trade Show",
    value: "trade_show",
  },
  {
    label: "Award Ceremony",
    value: "award",
  },
  {
    label: "Open Mic",
    value: "open_mic",
  },
  {
    label: "Book Launch",
    value: "book_launch",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const ARTIST_GENRES = [
  // Comedy / Performance
  { label: "Stand Up Comedian", value: "stand_up" },
  { label: "Improv Artist", value: "improv" },
  { label: "Sketch Comedian", value: "sketch" },
  { label: "Satire Comedian", value: "satire" },
  { label: "Slapstick Comedian", value: "slapstick" },
  { label: "Parody Artist", value: "parody" },
  { label: "Mimicry Artist", value: "mimicry" },
  { label: "MC / Host", value: "host" },
  { label: "Spoken Word Artist", value: "spoken_word" },
  { label: "Flash Mob / Group Performer", value: "flash_mob" },
  { label: "Comedy Skit / Drama Group", value: "comedy_group" },
  { label: "Street Performer", value: "street_performer" },
  { label: "Kids Entertainer", value: "kids_entertainer" },
  { label: "Circus Performer", value: "circus" },
  { label: "Fire Performer", value: "fire_performer" },
  { label: "Magic / Illusionist", value: "illusionist" },
  { label: "Puppeteer", value: "puppeteer" },

  // Music
  { label: "Singer", value: "singer" },
  { label: "Band", value: "band" },
  { label: "DJ", value: "dj" },
  { label: "Rapper / Hip Hop Artist", value: "rapper" },
  { label: "Classical Musician", value: "classical" },
  { label: "Qawwali / Sufi Singer", value: "qawwali" },
  { label: "Folk Singer", value: "folk" },
  { label: "Instrumentalist", value: "instrumentalist" },
  { label: "Instrumental Band", value: "instrumental_band" },
  { label: "Choir / Group Singer", value: "choir" },
  { label: "Fusion / Experimental Musician", value: "fusion" },
  { label: "Beatboxer", value: "beatboxer" },
  { label: "Opera Singer", value: "opera_singer" },
  { label: "Electronic Music Producer", value: "electronic_producer" },
  { label: "Songwriter / Composer", value: "composer" },

  // Dance / Physical Performance
  { label: "Dancer", value: "dancer" },
  { label: "Classical Dancer", value: "classical_dancer" },
  { label: "Modern / Contemporary Dancer", value: "modern_dancer" },
  { label: "Hip Hop / Street Dancer", value: "hiphop_dancer" },
  { label: "Acrobat / Gymnast", value: "acrobat" },
  { label: "Folk Dance Group", value: "folk_dance_group" },
  { label: "Ballroom / Latin Dancer", value: "ballroom_dancer" },
  { label: "Salsa / Tango Dancer", value: "salsa_dancer" },

  // Theatre / Acting
  { label: "Theatre Artist", value: "theatre" },
  { label: "Actor / Actress", value: "actor" },
  { label: "Stage Performer", value: "stage_performer" },
  { label: "Voice Over Artist", value: "voice_over" },

  // Visual / Digital Arts
  { label: "Live Painter / Visual Artist", value: "visual_artist" },
  { label: "Digital / Projection Artist", value: "digital_artist" },
  { label: "Virtual / Online Performance", value: "virtual_performance" },
  { label: "Instrument Repair / Workshop Artist", value: "workshop_artist" },
  { label: "Graffiti / Street Artist", value: "graffiti_artist" },
  { label: "Sculptor", value: "sculptor" },
  { label: "Illustrator / Cartoonist", value: "illustrator" },
  { label: "Photographer", value: "photographer" },
  { label: "Videographer / Filmmaker", value: "videographer" },
  { label: "Projection / Light Artist", value: "projection_artist" },
  { label: "Fashion / Costume Designer", value: "fashion_designer" },

  // Spoken / Written Arts
  { label: "Poet / Shayari", value: "poet" },
  { label: "Motivational Speaker", value: "speaker" },
  { label: "Content Creator / Influencer", value: "influencer" },
  { label: "Author / Writer", value: "author" },
  { label: "Playwright", value: "playwright" },
  { label: "Columnist / Blogger", value: "blogger" },
  { label: "Storyteller", value: "storyteller" },

  // Cultural / Traditional
  { label: "Folk Performer", value: "folk_performer" },
  { label: "Cultural Performer", value: "cultural" },
  { label: "Carnival / Parade Performer", value: "parade_performer" },
  { label: "Animal Trainer / Show", value: "animal_trainer" },
  { label: "Traditional / Ritual Performer", value: "ritual_performer" },

  // other

  { label: "Other", value: "other" },
];
