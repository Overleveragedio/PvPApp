"use client";
import { useState } from "react";
import { Camera, Mail, User, Link as LinkIcon } from "lucide-react";
import { FaTelegram, FaDiscord } from "react-icons/fa6";
import Button from "@/components/Button";
import { DeleteAccountDialog } from "@/components/settings/DeleteAccountDialog";

export default function Settings() {
    const [username, setUsername] = useState("TradeMaster42");
    const [email, setEmail] = useState("user@example.com");
    const [profileImage, setProfileImage] = useState("");
    const [isEmailConnected] = useState(true);
    const [isTelegramConnected, setIsTelegramConnected] = useState(false);
    const [isDiscordConnected, setIsDiscordConnected] = useState(true);
    const [discordUsername] = useState("TradeMaster#1234");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        // Implement save logic here
        console.log("Saving profile:", { username, email, profileImage });
    };

    const handleConnectTelegram = () => {
        // Implement Telegram OAuth flow
        console.log("Connecting Telegram...");
        setIsTelegramConnected(true);
    };

    const handleDisconnectTelegram = () => {
        setIsTelegramConnected(false);
    };

    const handleConnectDiscord = () => {
        // Implement Discord OAuth flow
        console.log("Connecting Discord...");
        setIsDiscordConnected(true);
    };

    const handleDisconnectDiscord = () => {
        setIsDiscordConnected(false);
    };

    return (
        <div className="h-full flex flex-col gap-6 pb-6 px-4 md:px-8 overflow-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Profile Settings</h2>

                {/* Profile Image */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center overflow-hidden">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-black">
                                    {username.charAt(0).toUpperCase()}
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Username
                        </div>
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter username"
                    />
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </div>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter email address"
                        />
                        {isEmailConnected && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                                Verified
                            </span>
                        )}
                    </div>
                    {!isEmailConnected && (
                        <p className="text-xs text-muted-foreground mt-1">
                            A verification email will be sent to this address
                        </p>
                    )}
                </div>

                {/* Save Button */}
                <Button onClick={handleSaveProfile} size="sm">
                    Save Changes
                </Button>
            </div>

            {/* Connected Accounts */}
            <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Connected Accounts</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Connect your social accounts for easier notifications
                </p>

                <div className="space-y-4">
                    {/* Telegram */}
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0088cc]/20 rounded-full flex items-center justify-center">
                                <FaTelegram className="w-5 h-5 text-[#0088cc]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Telegram</h3>
                                <p className="text-xs text-muted-foreground">
                                    {isTelegramConnected ? "Connected" : "Not connected"}
                                </p>
                            </div>
                        </div>
                        {isTelegramConnected ? (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleDisconnectTelegram}
                            >
                                Disconnect
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={handleConnectTelegram}
                            >
                                <LinkIcon className="w-4 h-4 mr-2" />
                                Connect
                            </Button>
                        )}
                    </div>

                    {/* Discord */}
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#5865F2]/20 rounded-full flex items-center justify-center">
                                <FaDiscord className="w-5 h-5 text-[#5865F2]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Discord</h3>
                                <p className="text-xs text-muted-foreground">
                                    {isDiscordConnected ? discordUsername : "Not connected"}
                                </p>
                            </div>
                        </div>
                        {isDiscordConnected ? (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleDisconnectDiscord}
                            >
                                Disconnect
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={handleConnectDiscord}
                            >
                                <LinkIcon className="w-4 h-4 mr-2" />
                                Connect
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card border border-red-500/20 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                </p>

                <DeleteAccountDialog />
            </div>
        </div>
    );
}
