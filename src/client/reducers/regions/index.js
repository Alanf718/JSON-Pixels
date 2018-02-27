// const defaultRegion = [{
//     type: 'osc',
//     expanded: true,
//     params: {
//         frequency: 440,
//         overtone: 0,
//         phase: 0,
//         amplitude: 0.125
//     }
// }];

const defaultRegions = [];

export const regions = (state = defaultRegions, {type} = {}) => {
    switch (type) {
        case 'ADD-REGION': {
            return state;
        }
        case 'REMOVE-REGION': {
            return state;
        }
        default:
            return state;
    }
};
