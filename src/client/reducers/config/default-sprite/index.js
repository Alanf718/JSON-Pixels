import { generateID } from '../../../containers/home/functions/utilities';

export const baseSpriteNonResettable = () => {
    const id = generateID();
    return {
        id: id,
        name: 'sprite' + id,
        visible: true,
        loaded: false,
        img: null,
        w: 0,
        h: 0
    };
};

export const baseSpriteResettable = () => {
    return {
        x: 0,
        y: 0
    };
};

const createBaseSprite = () => {
    return Object.assign({}, baseSpriteNonResettable(), baseSpriteResettable());
};

export default createBaseSprite;
