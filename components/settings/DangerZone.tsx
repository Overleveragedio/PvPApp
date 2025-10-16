import { DeleteAccountDialog } from "./DeleteAccountDialog";

export function DangerZone() {
    return (
        <div className="bg-card border border-red-500/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Once you delete your account, there is no going back. Please be certain.
            </p>
            <DeleteAccountDialog />
        </div>
    );
}