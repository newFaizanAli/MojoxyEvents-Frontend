import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../types";
import { useProfileStore } from "../../store";
import { validatePassword } from "../../utilities/functions";
import { OtpVerification } from "../../components/forms";
import { Button, Input, Label } from "../../components/ui/forms";


const ProfileForm = () => {
    const { profile, fetchProfile, updateProfile, changePassword } =
        useProfileStore();
    const [otpVerified, setOtpVerified] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [otpRequested, setOtpRequested] = useState(false);
    const [userProfile, setUserProfile] = useState<User>({
        _id: "",
        name: "",
        email: "",
        phone: "",
        role: "user",
        isActive: false,
    });

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (profile) {
            setUserProfile({
                _id: profile._id || "",
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                role: profile.role || "user",
                isActive: profile.isActive || false,
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile((prev) => {
            if (name === "email") {
                setEmailChanged(value !== profile?.email);
                setOtpVerified(false);
            }
            return { ...prev, [name]: value };
        });
    };

    const handlePasswordChange = async () => {
        if (!userProfile._id) return toast.error("User ID not found");

        const newPassword = prompt("Enter your new password:");
        if (!newPassword) return;

        const { valid, message } = validatePassword(newPassword);
        if (!valid) {
            toast.error(message);
        }

        const confirm = window.confirm("Are you sure you want to change password?");
        if (!confirm) return;

        try {
            await changePassword(userProfile._id, newPassword);

            toast.success("Password updated successfully.");
        } catch {
            toast.error("Failed to change password.");
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!userProfile._id) return toast.error("User ID not found");

        if (emailChanged && !otpVerified) {

            setOtpRequested(true);
            return toast.warning("Please verify your new email with OTP first.");
        }

        try {
            await updateProfile(userProfile._id, {
                name: userProfile.name,
                email: userProfile.email,
                phone: userProfile.phone,
            });

            toast.success("Profile updated successfully.");
        } catch {
            toast.error("Failed to update profile.");
        }
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
                <h5 className="mb-5 text-lg font-medium text-gray-800  lg:mb-6">
                    Personal Information
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    {emailChanged && otpRequested && !otpVerified ? (
                        <div className="col-span-2">
                            <OtpVerification
                                email={userProfile.email}
                                onVerified={() => {
                                    setOtpVerified(true);
                                    toast.success("OTP verified. You can now save changes.");
                                }}
                                onCancel={() => {
                                    setOtpRequested(false);
                                    setOtpVerified(false);
                                    setUserProfile((prev) => ({
                                        ...prev,
                                        email: profile?.email || "",
                                    }));
                                    toast.info("Email verification cancelled.");
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={userProfile.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={userProfile.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={userProfile.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button
                        className="btn btn-secondary"
                        variant="outline"
                        onClick={handlePasswordChange}
                    >
                        Change Password
                    </Button>
                    <Button type="submit" size="sm" variant="primary">
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
