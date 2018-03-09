import baseRegion from '../../../../../reducers/regions/default-region';
import polygonRegion from '../../../../../reducers/regions/default-region/polygon-region';

export const defaultPos = {
    x: 0,
    y: 0
};

export const defaultPolygon = Object.assign({}, baseRegion, polygonRegion);

export const defaultRightClickObj = {
    polygon: null,
    add: false
};
