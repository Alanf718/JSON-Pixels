export const ActionCreators = {
    /**
     * Set the region tool to either rectangle or polygon mode
     * @param {string} mode [rectangle|polygon]
     * @returns {{type: string, payload: [number]}} action
     */
    regionMode: ({mode}) => {
        return {
            type: 'REGION-MODE',
            payload: mode
        };
    }
};
