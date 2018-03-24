import { defaultConfig } from '..';
import { CANVAS_PIXEL_WIDTH, CANVAS_PIXEL_HEIGHT } from '../../../containers/home/constants';

/*eslint-disable*/
const spriteLoaded = (state = defaultConfig()) => {
    let obj = Object.assign({}, state);

    let width = 0;
    let height = 0;
    const img = obj.sprite.img;
    if (img.width >= img.height) {
        width = CANVAS_PIXEL_WIDTH;
        height = width * (img.height / img.width);
    } else {
        height = CANVAS_PIXEL_HEIGHT;
        width = height * (img.width / img.height);  
    }

    let x = CANVAS_PIXEL_WIDTH / 2 - width / 2;
    let y = CANVAS_PIXEL_HEIGHT / 2 - height / 2;

    Object.assign(obj.sprite, {loaded: true, x: x, y: y, w: width, h: height});
    return obj;
};

export default spriteLoaded;
