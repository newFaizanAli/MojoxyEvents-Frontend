export const ROUTES_PATHS = {
  PUBLIC: {
    HOME: "/",
    CATEGORIES: "/categories",
    ARTISTS: "/artists",
    ABOUT: "/about",
    CONTACT: "/contact",
    ARTIST_SLUG: (slug: string) => `/artist/${slug}`,
  },
  AUTH: {
    BASE: "/auth",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: (email: string) => `/auth/verify-otp/${email}`,
    RESET: (token: string) => `/auth/reset-password/${token}`,
  },
  DASHBOARD: {
    BASE: "/dashboard",
    USER: {
      BASE: "/dashboard/user",
      LIST: "/dashboard/users/list",
      BOOKING: {
        LIST: "/dashboard/user/booking/list",
      },
    },
    ARTIST: {
      BASE: (stage_name?: string) =>
        stage_name ? `/dashboard/artist/${stage_name}` : "/dashboard/artist",
      LIST: "/dashboard/artist/list",
    },
    CATEGORY: {
      BASE: (slug: string) =>
        slug ? `/dashboard/category/${slug}` : "/dashboard/category",
      LIST: "/dashboard/category/list",
    },
    PACKAGE: {
      BASE: (package_id?: string) =>
        package_id ? `/dashboard/package/${package_id}` : "/dashboard/package",
      LIST: "/dashboard/package/list",
    },
    BOOKING: {
      BASE: "/dashboard/booking",
      LIST: "/dashboard/booking/list",
    },
    PAYMENT: {
      BASE: "/dashboard/payment",
      LIST: "/dashboard/payment/list",
    },
  },
  PROTECTED: {
    ARTIST: {
      BOOKING: {
        ADD: (slug: string) => `/artist/${slug}/book`,
      },
    },
    BOOKING: {
      VIEW: (booking_id: string) => `/booking/${booking_id}`,
    },
  },
  DENIED: "/denied",
  NOT_FOUND: "*",
};
