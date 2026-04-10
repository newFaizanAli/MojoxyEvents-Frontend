import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES_PATHS } from "../../routes/route_paths";
import { SignupErrors } from "../../types";
import { authService } from "../../services/auth";
import { EMAIL_REGEX } from "../../utilities/constants";
import { validatePassword } from "../../utilities/functions";
import { AuthBottomLink, AuthFormHeader, OtpVerification, PasswordField } from "../../components/forms"
import { Button, Input, Label } from "../../components/ui/forms";


const SignUpForm = ({
  role
}: {
  role: "artist" | "user";
}) => {

  const isUser = role === "user";


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: isUser ? "user" : "artist",
    phone: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [showOtpBox, setShowOtpBox] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpVerified = async () => {
    try {
      const res = await authService.signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.phone
      );

      if (res?.success && res.success === true) {
        navigate(ROUTES_PATHS?.AUTH.SIGNIN);

      } else {
        setErrors({ form: "Something went wrong during sign up." });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const validateForm = () => {
    const newErrors: SignupErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required.";

    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const { valid, message } = validatePassword(formData.password);
    if (!valid) newErrors.password = message;
    else if (!formData.phone.trim()) newErrors.phone = "Phone no is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowOtpBox(true);
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <AuthFormHeader title={isUser ? "Sign Up" : "Artist Sign Up"} desc="Enter your details to sign up!" />
      {showOtpBox ?
        <OtpVerification
          email={formData.email}
          onVerified={handleOtpVerified}
          isResend={true}
          onCancel={() => setShowOtpBox(false)}
        />
        : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid  gap-3">
                <div>
                  <Label>Name*</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label>Email*</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone no"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Password*</Label>
                  <PasswordField
                    name="password"
                    label="Password*"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </div>

                <div className="w-full">
                  <Button type="submit" className="w-full" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      <AuthBottomLink isSignup={true} isUser={!isUser} />
    </div>
  )
}

export default SignUpForm
