const useTestnix = () => {
    const trackClicks = async ({ hash, experimentId, variantId }) => {
        if (process.env.NODE_ENV === "development") {
            console.log("%c[TestNix]%c Tracking is disabled in development mode. No requests will be sent to the server.", "color: rgba(100, 100, 100, 1);", "");
            console.log(`%c[TestNix]%c [${variantId}] of experiment '${experimentId}'.`, "color: rgba(100, 100, 100, 1);", "");
            return;
        }
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
    const trackConversions = async ({ hash, experimentId, variantId }) => {
        if (process.env.NODE_ENV == "development") {
            console.log("%c[TestNix]%c Tracking is disabled in development mode. No requests will be sent to the server.", "color: rgba(100, 100, 100, 1);", "");
            console.log(`%c[TestNix]%c [${variantId}] of experiment '${experimentId}'.`, "color: rgba(100, 100, 100, 1);", "");
            return;
        }
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
