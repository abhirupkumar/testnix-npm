import * as React from 'react';

const useTestnix = () => {
    const trackClicks = async ({ hash, experimentId, variantId }: { hash: string, experimentId: string, variantId: string }) => {
        const fetchedVariant = await fetch(`https://testnix.vercel.app/api/v1/event-clicks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash, variantId, experimentId }),
        });
        const fetchedData = await fetchedVariant.json();
        if (fetchedData.success == false) {
            throw new Error(fetchedData.error);
        }
    };

    const trackConversions = async ({ hash, experimentId, variantId }: { hash: string, experimentId: string, variantId: string }) => {
        const fetchedVariant = await fetch(`https://testnix.vercel.app/api/v1/event-conversions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash, variantId, experimentId }),
        });
        const fetchedData = await fetchedVariant.json();
        if (fetchedData.success == false) {
            throw new Error(fetchedData.error);
        }
    };

    return {
        trackClicks,
        trackConversions
    };
};

export { useTestnix };