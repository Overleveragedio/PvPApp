"use client";
import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/Button";
import { FormField } from "@/components/ui/form-field";

const profileValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
    email: Yup.string()
        .email("Invalid email address")
});

interface ProfileSettingsFormProps {
    initialUsername: string;
    initialEmail: string;
    initialProfilePicture?: string;
    isEmailVerified?: boolean;
    onSubmit: (data: { username?: string; email?: string; profilePicture?: string }) => void;
    isSubmitting?: boolean;
}

export function ProfileSettingsForm({
    initialUsername,
    initialEmail,
    initialProfilePicture = "",
    isEmailVerified = false,
    onSubmit,
    isSubmitting = false
}: ProfileSettingsFormProps) {
    const [profileImage, setProfileImage] = useState(initialProfilePicture);

    const formik = useFormik({
        initialValues: {
            username: initialUsername,
            email: initialEmail,
        },
        validationSchema: profileValidationSchema,
        onSubmit: (values) => {
            // Only include changed values
            const changedValues: { username?: string; email?: string; profilePicture?: string } = {};
            console.log(values)
            console.log(initialUsername)

            if (values.username !== initialUsername) {
                changedValues.username = values.username;
            }

            if (values.email !== initialEmail) {
                changedValues.email = values.email;
            }

            if (profileImage !== initialProfilePicture) {
                changedValues.profilePicture = profileImage;
            }

            console.log(changedValues)
            // Only submit if there are actual changes
            if (Object.keys(changedValues).length > 0) {
                onSubmit(changedValues);
            }
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                // Mark form as dirty since profileImage changed
                formik.setFieldTouched('username', true);
            };
            reader.readAsDataURL(file);
        }
    };

    // Check if anything has changed (form fields or profile image)
    const hasChanges = formik.dirty || profileImage !== initialProfilePicture;

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Profile Settings</h2>

            <form onSubmit={formik.handleSubmit}>
                {/* Profile Image */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center overflow-hidden">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-black">
                                    {formik.values.username.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <Camera className="w-4 h-4 text-black" />
                        </label>
                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Profile Picture</h3>
                        <p className="text-sm text-muted-foreground">
                            Click the camera icon to upload a new picture
                        </p>
                    </div>
                </div>

                {/* Username */}
                <FormField
                    icon={<User className="w-4 h-4" />}
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username ? formik.errors.username : undefined}
                    className="mb-4"
                />

                {/* Email */}
                <FormField
                    icon={<Mail className="w-4 h-4" />}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email ? formik.errors.email : undefined}
                    badge={isEmailVerified ? { text: "Verified", variant: "success" } : undefined}
                    helperText={!isEmailVerified ? "A verification email will be sent to this address" : undefined}
                    className="mb-6"
                />

                {/* Save Button */}
                <Button
                    type="submit"
                    size="sm"
                    disabled={!formik.isValid || !hasChanges || isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}