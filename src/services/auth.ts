import { AxiosError } from "axios";
import axios from "../services/axios_config";
import { END_POINT_API } from "../config";
import { toastError } from "../utilities/toast_utils";

interface SignUpUser {
  // id: string;
  name: string;
  email: string;
}

export const authService = {
  async signin(email: string, password: string) {
    try {
      const response = await axios.post(`${END_POINT_API?.AUTH?.SIGNIN}`, {
        email,
        password,
      });
      const data = response?.data;

      const user: SignUpUser = {
        // id: data._id,
        name: data.name,
        email: data.email,
      };

      return { user, token: data.token };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || "Anything went wrong.";
      toastError(msg);
    }
  },

  async signup(
    name: string,
    email: string,
    password: string,
    role: string,
    phone: string,
  ) {
    const response = await axios.post(`${END_POINT_API?.AUTH?.SIGNUP}`, {
      name,
      email,
      password,
      role,
      phone,
    });
    const data = response?.data;

    return { success: data.success };
  },

  async generateOTP(email: string) {
    const res = await axios.post(`${END_POINT_API?.AUTH?.GENERATE_OTP}`, {
      email,
    });

    return res?.data;
  },

  async verifyOTP(email: string, otp: string) {
    const res = await axios.post(`${END_POINT_API?.AUTH?.VERIFY_OTP}`, {
      email,
      otp,
    });

    return res?.data;
  },

  logout(): void {
    // TODO: Implement actual logout logic
    localStorage.removeItem("mjx_token");
    localStorage.removeItem("mjx_user");
  },

  async forgotPassword(email: string) {
    const res = await axios.post(
      `${END_POINT_API?.AUTH?.FORGOT_PASSWORD_OTP}`,
      { email },
    );

    return res.data;
  },

  getCurrentUser(): SignUpUser | null {
    const user = localStorage.getItem("mjx_user");

    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("mjx_token");
  },

  async resetPassword(token: string, password: string) {
    const res = await axios.post(`${END_POINT_API?.AUTH?.RESET_PASSWORD}`, {
      password,
      token,
    });

    return res.data;
  },
};
