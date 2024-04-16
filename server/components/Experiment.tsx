import * as React from 'react';
import { ReactNode, Children, isValidElement } from 'react';
import { VariantProps } from './Variant';
import "server-only";

export type ExperimentProps = {
    experimentId: string;
    children: ReactNode;
    experimentHash: string;
}

const Experiment = async ({ experimentId, children, experimentHash }: ExperimentProps) => {

    let allVariants: VariantProps[] = [];
    Children.map(children, (child: ReactNode) => {
        if (!isValidElement(child)) throw new Error('Invalid Variant Element');
        const currVariantId = (child as any).props.variantId;
        if (allVariants.find(v => v === currVariantId)) {
            throw new Error("[TestNix] Make sure all Variant Ids inside your Experiment are unique.");
        }
        if (!currVariantId || currVariantId == "") {
            throw new Error("[TestNix] Please enter a unique Variant Id.");
        }

        allVariants.push(currVariantId);
    });

    const fetchedVariant = await fetch(`https://testnix.vercel.app/api/v1/variant`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash: experimentHash, variantIds: allVariants, experimentId }),
    });
    const fetchedData = await fetchedVariant.json();
    if (fetchedData.success == false) {
        throw new Error(fetchedData.error);
    }
    const variantId = fetchedData.data;

    return (
        <>
            {Children.map(children, (child: ReactNode) => {
                const currVariantId = (child as any).props.variantId;
                if (currVariantId === variantId) {
                    return child;
                }
            })}
        </>
    )
}

export { Experiment as default };