import * as React from 'react';
import { useState } from 'react';

const useTrackify = () => {
    const [clicks, setClicks] = useState(0);
    const [conversions, setConversions] = useState(0);

    const trackClicks = async (variantId: string) => {
        setClicks(clicks + 1);
    };

    const trackConversions = async (variantId: string) => {
        setConversions(conversions + 1);
    };

    return {
        trackClicks,
        trackConversions
    };
};

export { useTrackify };