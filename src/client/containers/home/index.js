import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from './actions/index';
import {RegionSelector} from './components/region-selector';
import {SelectedRegion} from './components/selected-region';

import './style.scss';
import { REGION_MODE_RECTANGLE, REGION_MODE_POLYGON } from './enums/region-modes';

/* eslint-disable no-unused-vars */
const selected = {
    regionSelected: [
        {x: 0, y: 0},
        {x: 32, y: 32}
    ],
    tags: []
};

/* eslint-enable */

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {regionMode, config, toggleNodes, toggleSaveRegion, regions,
            layers, addRegion, removeRegion, saveRegion, updateSelectedRegion,
            resetRegion} = this.props;

        /*eslint-disable*/
        const toggleNodesState = regions.config.showNodes;

        return (
            <div className="frame-tags">
                <div>
                    <RegionSelector
                        regionMode={config.regionMode}
                        saveRegion={config.saveRegion}
                        saveRegionAction={saveRegion}
                        toggleSaveRegion={toggleSaveRegion}
                        toggleNodes={toggleNodes}
                        showNodes={toggleNodesState}
                        regions={regions}
                        layerConfig={layers.config}
                        addRegion={addRegion}
                        removeRegion={removeRegion}
                        resetRegion={resetRegion}
                        updateSelectedRegion={updateSelectedRegion}
                    />
                    <button onClick={() => {
                        addRegion({mode: regionMode});
                        updateSelectedRegion({index: regions.config.selectedRegion + 1});
                    }}>New Region</button>
                    <button onClick={() => regionMode({mode: REGION_MODE_RECTANGLE})}>Rectangle</button>
                    <button onClick={() => regionMode({mode: REGION_MODE_POLYGON})}>Polygon</button>

                    <pre id="debug">
                        {JSON.stringify(config)}
                    </pre>
                </div>
                <SelectedRegion
                    toggleNodes={toggleNodes}
                    toggleNodesState={!toggleNodesState}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => (bindActionCreators({...ActionCreators}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
