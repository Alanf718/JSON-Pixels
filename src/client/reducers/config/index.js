import { ACTION_REGION_MODE, ACTION_TOGGLE_SAVE_REGION, REGION_MODE_RECTANGLE,
    ACTION_LOAD_SPRITE, ACTION_SPRITE_LOADED} from '../../containers/home/actions';
import loadSprite from './load-sprite';
import createBaseSprite from './default-sprite';
import spriteLoaded from './sprite-loaded';

export const defaultConfig = () => {
    return {
        regionMode: REGION_MODE_RECTANGLE,
        saveRegion: false,
        sprite: createBaseSprite()
    };
};
/*eslint-disable*/
export const config = (state = defaultConfig(), {type, payload} = {}) => {
    switch (type) {
        case ACTION_REGION_MODE: {
            if (payload === null) { return state; }
            return {...state, regionMode: payload};
        }
        case ACTION_TOGGLE_SAVE_REGION: {
            return {...state, saveRegion: payload};
        }
        case ACTION_LOAD_SPRITE: {
            return loadSprite(state, payload);
        }
        case ACTION_SPRITE_LOADED: {
            return spriteLoaded(state);
        }
        default:
            return state;
    }
};
