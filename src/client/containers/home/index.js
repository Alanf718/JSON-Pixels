import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators, REGION_MODE_RECTANGLE, REGION_MODE_POLYGON} from './actions/index';
import {RegionSelector} from './components/region-selector';
import {SelectedRegion} from './components/selected-region';

import './style.scss';
import { RegionTree } from './components/region-tree';

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
            updateSelectedRegionID, resetRegion, tree, editName, saveName,
            shiftRegionUp, shiftRegionDown} = this.props;

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
                        regionList={regions.list}
                        regionConfig={regions.config}
                        layerConfig={layers.config}
                        addRegion={addRegion}
                        removeRegion={removeRegion}
                        resetRegion={resetRegion}
                        updateSelectedRegion={updateSelectedRegion}
                        updateSelectedRegionID={updateSelectedRegionID}
                    />
                    <button onClick={() => {
                        addRegion({mode: config.regionMode});
                        updateSelectedRegion({index: regions.config.selectedRegion + 1});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>New Region</button>
                    <button onClick={() => {
                        regionMode({mode: REGION_MODE_RECTANGLE});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Rectangle</button>
                    <button onClick={() => {
                        regionMode({mode: REGION_MODE_POLYGON});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Polygon</button>

                    <pre id="debug">
                        {JSON.stringify(config)}
                    </pre>
                </div>
                <RegionTree
                    regions={regions.list}
                    selectedID={regions.config.selectedRegionID}
                    updateSelectedRegion={updateSelectedRegion}
                    updateSelectedRegionID={updateSelectedRegionID}
                    regionMode={regionMode}
                    readonly={tree.readonly}
                    saveName={saveName}
                />
                <SelectedRegion
                    toggleNodes={toggleNodes}
                    toggleNodesState={!toggleNodesState}
                    editName={editName}
                    readonly={tree.readonly}
                    shiftRegionUp={shiftRegionUp}
                    shiftRegionDown={shiftRegionDown}
                    updateSelectedRegion={updateSelectedRegion}
                    updateSelectedRegionID={updateSelectedRegionID}
                    index={regions.config.selectedRegion}       
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => (bindActionCreators({...ActionCreators}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
