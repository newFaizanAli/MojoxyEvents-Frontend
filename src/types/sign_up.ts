export interface SignUpUser {
  // id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
}

export interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  form?: string;
}
