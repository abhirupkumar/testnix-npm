import * as React from 'react';
import { ReactNode } from "react";
import "server-only";

export type VariantProps = {
    variantId: string;
    children: ReactNode;
}

const Variant = ({ variantId, children }: VariantProps) => {

    if (!variantId || variantId == "") {
        throw new Error("[TestNix] Please enter a unique Variant Id.");
    }

    return (
        <>
            {children}
        </>
    )
}

Variant.displayName = 'Textnix.Variant';

export { Variant };