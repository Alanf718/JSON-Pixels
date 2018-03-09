import baseRegion from '../../../../../reducers/regions/default-region';
import rectangleRegion from '../../../../../reducers/regions/default-region/rect-region';

export const defaultPos = {
    x: 0,
    y: 0
};

export const defaultRectangle = Object.assign({}, baseRegion, rectangleRegion);
