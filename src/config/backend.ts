// export const PROJECT_URL = `http://localhost:3000`;

export const PROJECT_URL = `https://latest-mojoxy-backend.vercel.app`;

export const BASE_API_URL = "/api";

export const END_POINT_API = {
  //   DASHBOARD: {
  //     BASE: `${BASE_API_URL}/dashboard`,
  //   },

  AUTH: {
    BASE: `${BASE_API_URL}/auth`,
    SIGNIN: `${BASE_API_URL}/auth/signin`,
    SIGNUP: `${BASE_API_URL}/auth/signup`,
    GENERATE_OTP: `${BASE_API_URL}/auth/otp/generate-otp`,
    VERIFY_OTP: `${BASE_API_URL}/auth/otp/verify-otp`,
    PROFILE: {
      BASE: `${BASE_API_URL}/auth/profile`,
      BY_ID: (id: string) => `${BASE_API_URL}/auth/profile/${id}`,
      PASSWORD: (id: string) => `${BASE_API_URL}/auth/profile/${id}/password`,
    },
    FORGOT_PASSWORD_OTP: `${BASE_API_URL}/auth/otp/forgot-password`,
    RESET_PASSWORD: `${BASE_API_URL}/auth/reset-password`,
  },

  CATEGORY: {
    BASE: `${BASE_API_URL}/category`,
    BY_ID: (id: string) => `${BASE_API_URL}/category/${id}`,
    SLUG: (slug: string) => `${BASE_API_URL}/category/slug/${slug}`,
  },

  ARTISTS: {
    BASE: `${BASE_API_URL}/artist`,
    BY_STAGE_NAME: (stage_name: string) =>
      `${BASE_API_URL}/artist/stage_name/${stage_name}`,
    BOOKING_DETAIL: (artistId: string) =>
      `${BASE_API_URL}/artist/${artistId}/booked-dates`,
    BY_ID: (id: string) => `${BASE_API_URL}/artist/${id}`,
  },
  BOOKING: {
    BASE: `${BASE_API_URL}/booking`,
    SELF: `${BASE_API_URL}/booking/self`,
    BY_ID: (id: string) => `${BASE_API_URL}/booking/${id}`,
    ACCEPT: (id: string) => `${BASE_API_URL}/booking/${id}/accept`,
    ARTIST: `${BASE_API_URL}/booking/artist`,
  },
  PACKAGE: {
    BASE: `${BASE_API_URL}/package`,
    BY_ID: (id: string) => `${BASE_API_URL}/package/${id}`,
  },
  USER: {
    BASE: `${BASE_API_URL}/user`,
    BY_ID: (id: string) => `${BASE_API_URL}/user/${id}`,
  },
  PAYMENT: {
    BASE: `${BASE_API_URL}/payment`,
    BY_ID: (id: string) => `${BASE_API_URL}/payment/${id}`,
  },
};
