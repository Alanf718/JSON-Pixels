import { ACTION_EDIT_NAME } from '../../containers/home/actions';

const defaultTree = () => {
    return {
        readonly: true
    };
};

export const tree = (state = defaultTree(), {type, payload} = {}) => {
    switch (type) {
        case ACTION_EDIT_NAME: {
            return {...state, readonly: payload};
        }
        default:
            return state;
    }
};
