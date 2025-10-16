"use client";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileSettingsForm } from "@/components/settings/ProfileSettingsForm";
import { ConnectedAccounts } from "@/components/settings/ConnectedAccounts";
import { DangerZone } from "@/components/settings/DangerZone";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/user";
import { useStatusDialog } from "@/contexts/StatusDialogContext";
import { User } from "@/types/competitions";
import { isAxiosError } from "axios";

interface UpdateUserData {
    username?: string;
    email?: string;
    profilePicture?: string;
}

export default function Settings() {
    const { user } = useAuth();
    const { showSuccess, showError } = useStatusDialog();

    const { mutate: handleUpdateUser, isPending } = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: async (data: UpdateUserData) => {
            if (!user) throw new Error("No user found");
            console.log(data)
            // Merge only the changed fields
            return updateUser({
                ...user,
                ...data,
            } as User);
        },
        onSuccess: (updatedUser) => {
            showSuccess({
                message: "Profile Updated",
                submessage: "Your profile has been successfully updated.",
                buttonText: "Close"
            });
        },
        onError: (error) => {
            let errorMessage = "Failed to update profile";

            if (isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }

            showError({
                message: "Update Failed",
                submessage: errorMessage,
                buttonText: "Close"
            });
        },
    });

    return (
        <div className="h-full flex flex-col gap-6 pb-6 px-4 md:px-8 overflow-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            <ProfileSettingsForm
                initialUsername={user?.username || ""}
                initialEmail={user?.email || ""}
                initialProfilePicture={user?.profilePicture || ""}
                isEmailVerified={false}
                onSubmit={handleUpdateUser}
                isSubmitting={isPending}
            />

            <ConnectedAccounts />

            <DangerZone />
        </div>
    );
}