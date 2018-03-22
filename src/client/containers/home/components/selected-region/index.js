import React, {Component} from 'react';

import './style.scss';
import { canShiftRegionUp, canShiftRegionDown } from '../../functions/utilities';

export class SelectedRegion extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {toggleNodes, toggleNodesState, editName, readonly, shiftRegionUp, shiftRegionDown,
            updateSelectedRegion, updateSelectedRegionID, index, removeRegion, regionMode, mode,
            isGroupRegion, regionList, selectedRegion, toggleVisibility, visibilityState,
            toggleFolded, foldedState} = this.props;

        const canShiftUp = canShiftRegionUp(regionList, selectedRegion);
        const canShiftDown = canShiftRegionDown(regionList, selectedRegion);
        const canRemoveRegion = regionList.length > 1 ? true : false;

        return (
            <div className="display zoomed-display">
                <div className="tool-bar">
                    <button type="button" disabled={isGroupRegion}
                        onClick={() => toggleNodes({state: toggleNodesState})}>Toggle Nodes</button>
                    <button type="button" onClick={() => editName({state: !readonly})}>Toggle Rename</button>
                    <br/>
                    <button type="button"
                        onClick={() => toggleVisibility({index: -1, state: visibilityState})}>Toggle Visbility</button>
                    <button type="button" disabled={!isGroupRegion}
                        onClick={() => toggleFolded({index: -1, state: foldedState})}>Toggle Folded</button>
                    <br/>
                    <button type="button" disabled={!canShiftUp} onClick={() => {
                        shiftRegionUp({});
                        updateSelectedRegionID({});
                    }}>Shift Up</button>
                    <button type="button" disabled={!canShiftDown} onClick={() => {
                        shiftRegionDown({});
                        updateSelectedRegionID({});
                    }}>Shift Down</button>
                    <br/>
                    <button type="button" disabled={!canRemoveRegion} onClick={() => {
                        removeRegion({});
                        updateSelectedRegion({index: index});
                        updateSelectedRegionID({});
                        regionMode({mode: mode});
                    }}>Remove Region</button>
                </div>
            </div>
        );
    }
}

export default SelectedRegion;
