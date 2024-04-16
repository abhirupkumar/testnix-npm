import * as React from 'react';
import { ReactNode } from "react";
import "server-only";
export type VariantProps = {
    variantId: string;
    children: ReactNode;
};
declare const Variant: {
    ({ variantId, children }: VariantProps): React.JSX.Element;
    displayName: string;
};
export { Variant as default };
