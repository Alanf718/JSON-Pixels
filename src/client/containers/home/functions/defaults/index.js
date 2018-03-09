import rectangleRegion from '../../../../reducers/regions/default-region/rect-region';
import polygonRegion from '../../../../reducers/regions/default-region/polygon-region';
import baseRegion from '../../../../reducers/regions/default-region';

/**
 * Factory function to generate a position object.
 * @returns {Object} Generated object.
 */
export const defaultPos = () => {
    return {
        x: 0,
        y: 0
    };
};

/**
 * Factory function to generate a Rectangle Region
 * object.
 * @returns {Object} Generated object.
 */
export const defaultRectangle = () => {
    return Object.assign({}, baseRegion(), rectangleRegion());
};

/**
 * Factory function to generate a Polygon Region
 * object.
 * @returns {Object} Generated object.
 */
export const defaultPolygon = () => {
    return Object.assign({}, baseRegion(), polygonRegion());
};
