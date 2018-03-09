import { ACTION_REGION_MODE, ACTION_ADD_REGION, ACTION_REMOVE_REGION, ACTION_TOGGLE_NODES,
    ACTION_SAVE_REGION, ACTION_TOGGLE_SAVE_REGION } from './action-types';

import('./action-types/index.js');

export const ActionCreators = {
    /**
     * Set the region tool to either rectangle or polygon mode
     * @param {string} mode [REGION_MODE_ENUM]
     * @returns {{type: string, payload: string}} action
     */
    regionMode: ({mode}) => {
        return {
            type: ACTION_REGION_MODE,
            payload: mode
        };
    },

    /**
     * Adds a new region of the currently selected type to the
     * list of created regions with either default values or
     * with a specified region object.
     * @param {string} mode [REGION_MODE_ENUM]
     * @param {Object} [region=null] The region to add.
     * @returns {{type: string, payload: {mode: string, region: Object}}} action
     */
    addRegion: ({mode}) => {
        return {
            type: ACTION_ADD_REGION,
            payload: mode//{mode: mode, region: region}
        };
    },

    /**
     * Removes the region at the currently selected index
     * from the list of created regions.
     * @param {number} index [n]
     * @returns {{type: string, payload: number}} action
     */
    removeRegion: ({index}) => {
        return {
            type: ACTION_REMOVE_REGION,
            payload: index
        };
    },

    /**
     * Toggles whether to notify the state that the current
     * region needs to be saved.
     * @param {boolean} state [n]
     * @returns {{type: string, payload: boolean}} action
     */
    toggleSaveRegion: ({state}) => {
        return {
            type: ACTION_TOGGLE_SAVE_REGION,
            payload: state
        };
    },

    /**
     * Saves the currently selected temporary region
     * to the state.
     * @param {Object} region [n]
     * @returns {{type: string, payload: Object}} action
     */
    saveRegion: ({region}) => {
        return {
            type: ACTION_SAVE_REGION,
            payload: region
        };
    },

    /**
     * Toggles whether to display nodes for the regions
     * within the currently selected layer.
     * @param {boolean} state [n]
     * @returns {{type: string, payload: boolean}} action
     */
    toggleNodes: ({state}) => {
        return {
            type: ACTION_TOGGLE_NODES,
            payload: state
        };
    }
};
