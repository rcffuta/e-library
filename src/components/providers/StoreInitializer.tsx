"use client";

import { useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { AuthUser } from "@/types/app.type";


export function StoreInitializer({ user }: { user: AuthUser }) {
    const initialized = useRef(false);

    if (!initialized.current) {
        // Direct state mutation for immediate availability
        useAuthStore.setState({
            user,
            isLoading: false,
            isInitialized: true,
        });
        initialized.current = true;
    }

    return null;
}
