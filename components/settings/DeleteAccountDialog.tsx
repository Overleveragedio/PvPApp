"use client";
import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import Button from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteAccountDialog() {
    const [open, setOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        if (confirmText !== "DELETE") return;

        setIsDeleting(true);
        // Implement account deletion logic here
        console.log("Deleting account...");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsDeleting(false);
        setOpen(false);
        // Redirect to home page or logout
    };

    const isConfirmValid = confirmText === "DELETE";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-red-400">Delete Account</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Warning */}
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-400">
                            <p className="font-medium mb-2">Warning! This will:</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Permanently delete your account</li>
                                <li>Remove all your trading history</li>
                                <li>Forfeit any remaining balance</li>
                                <li>Cancel all active competitions</li>
                                <li>Remove all connected accounts</li>
                            </ul>
                        </div>
                    </div>

                    {/* Confirmation Input */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Type <span className="font-bold text-red-400">DELETE</span> to confirm
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Type DELETE"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                            className="flex-1"
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleDeleteAccount}
                            disabled={!isConfirmValid || isDeleting}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                        >
                            {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

