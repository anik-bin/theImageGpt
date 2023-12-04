"use client";

import { useEffect, useState } from "react";
import { ProText } from "./ProText";

export const ProTextProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ProText />
        </>
    )

}