declare const useTestnix: () => {
    trackClicks: ({ hash, experimentId, variantId }: {
        hash: string;
        experimentId: string;
        variantId: string;
    }) => Promise<void>;
    trackConversions: ({ hash, experimentId, variantId }: {
        hash: string;
        experimentId: string;
        variantId: string;
    }) => Promise<void>;
};
export { useTestnix };
