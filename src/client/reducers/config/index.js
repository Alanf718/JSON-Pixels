const defaultConfig = {
    regionMode: 'rectangle'
};

export const config = (state = defaultConfig, {type, payload} = {}) => {
    switch (type) {
        case 'REGION-MODE': {
            return {...state, regionMode: payload};
        }
        default:
            return state;
    }
};
