import React, {Component} from 'react';

import './style.scss';

export class SelectedRegion extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {toggleNodes, toggleNodesState, editName, readonly, shiftRegionUp, shiftRegionDown,
            updateSelectedRegion, updateSelectedRegionID, index, removeRegion} = this.props;
        return (
            <div className="display zoomed-display">
                <div className="tool-bar">
                    <button type="button" onClick={() => toggleNodes({state: toggleNodesState})}>Toggle Nodes</button>
                    <button type="button" onClick={() => editName({state: !readonly})}>Toggle Rename</button>
                    <br/>
                    <button type="button" onClick={() => {
                        shiftRegionUp({});
                        updateSelectedRegion({index: index - 1});
                        updateSelectedRegionID({});
                    }}>Shift Up</button>
                    <button type="button" onClick={() => {
                        shiftRegionDown({});
                        updateSelectedRegion({index: index + 1});
                        updateSelectedRegionID({});
                    }}>Shift Down</button>
                    <br/>
                    <button type="button" onClick={() => {
                        removeRegion({});
                        updateSelectedRegion({index: index});
                        updateSelectedRegionID({});
                    }}>Remove Region</button>
                </div>
            </div>
        );
    }
}

export default SelectedRegion;
