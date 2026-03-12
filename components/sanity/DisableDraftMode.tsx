"use client";

/**
 * DisableDraftMode component (client component).
 *
 * Renders a button that calls the `disableDraftMode` server action to exit
 * Sanity draft/preview mode. The button is intentionally hidden while the
 * page is being viewed inside the Sanity Presentation tool so that editors
 * are not distracted by it during visual editing sessions.
 *
 * The `useTransition` hook keeps the UI responsive while the server action
 * is in-flight, showing a "Disabling draft mode…" message in the interim.
 */
import { useTransition } from "react";
import { disableDraftMode } from "@/app/actions";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
    /** `pending` becomes true while the server action is executing. */
    const [pending, startTransition] = useTransition();

    /**
     * `null`  — not yet determined (still detecting environment)
     * `true`  — page is inside the Sanity Presentation tool
     * `false` — page is viewed outside the Presentation tool
     */
    const isPresentationTool = useIsPresentationTool();

    // Only show the disable draft mode button when outside of Presentation Tool.
    // Returning null when `isPresentationTool` is null (undetermined) avoids
    // a flash of the button during the initial render.
    if (isPresentationTool === null && isPresentationTool !== true) {
        return null;
    }

    /** Wraps the server action in a transition for a non-blocking UI update. */
    const disable = () =>
        startTransition(() => disableDraftMode());

    return (
        <div>
            {pending ? (
                "Disabling draft mode..."
            ) : (
                <button type="button" onClick={disable}>
                    Disable draft mode
                </button>
            )}
        </div>
    );
}