import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators, REGION_MODE_RECTANGLE, REGION_MODE_POLYGON, REGION_MODE_GROUP} from './actions/index';
import {RegionSelector} from './components/region-selector';
import {SelectedRegion} from './components/selected-region';

import './style.scss';
import { RegionTree } from './components/region-tree';
import { convertRegionTypeToMode } from './functions/utilities/converters';

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
            shiftRegionUp, shiftRegionDown, createGroup, addChild, toggleFolded,
            toggleVisibility} = this.props;

        /*eslint-disable*/
        const toggleNodesState = regions.config.showNodes;
        const isGroupRegion = config.regionMode === REGION_MODE_GROUP ? true : false;
        const removeRegionNextMode = regions.config.selectedRegion - 1 >= 0 && regions.config.selectedRegion - 1 < regions.list.length ?
            convertRegionTypeToMode(regions.list[regions.config.selectedRegion - 1].type) : null;
        const visibleState = regions.config.selectedRegion >= 0 && regions.config.selectedRegion < regions.list.length ?
            !regions.list[regions.config.selectedRegion].visible : null;
        const foldedState = isGroupRegion ? !regions.list[regions.config.selectedRegion].folded : null;
        
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
                        resetRegion={resetRegion}
                        updateSelectedRegion={updateSelectedRegion}
                        updateSelectedRegionID={updateSelectedRegionID}
                    />
                    <button onClick={() => {
                        addRegion({mode: config.regionMode});
                        updateSelectedRegion({index: regions.list.length - 1});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                        toggleNodes({state: false});
                    }}>New Region</button>
                    <button onClick={() => {
                        regionMode({mode: REGION_MODE_GROUP});
                        createGroup({});
                        updateSelectedRegion({index: regions.config.selectedRegion + 1});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                        toggleNodes({state: false});
                    }}>New Group</button>
                    <button disabled={isGroupRegion} onClick={() => {
                        regionMode({mode: REGION_MODE_RECTANGLE});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Rectangle</button>
                    <button disabled={isGroupRegion} onClick={() => {
                        regionMode({mode: REGION_MODE_POLYGON});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Polygon</button>

                    <br/>

                    <button disabled={!isGroupRegion} onClick={() => {
                        regionMode({mode: REGION_MODE_RECTANGLE});
                        addChild({mode: config.regionMode, index: -1});
                        updateSelectedRegion({index: regions.config.selectedRegion + 1});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Add Child Rectangle</button>

                    <button disabled={!isGroupRegion} onClick={() => {
                        regionMode({mode: REGION_MODE_POLYGON});
                        addChild({mode: config.regionMode, index: -1});
                        updateSelectedRegion({index: regions.config.selectedRegion + 1});
                        updateSelectedRegionID({id: regions.list[regions.config.selectedRegion].id});
                    }}>Add Child Polygon</button>
                    
                    <pre id="debug">
                        {JSON.stringify(regions.config)}
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
                    toggleNodes={toggleNodes}
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
                    removeRegion={removeRegion}
                    regionMode={regionMode}
                    mode={removeRegionNextMode}
                    isGroupRegion={isGroupRegion}
                    regionList={regions.list}
                    selectedRegion={regions.config.selectedRegion}
                    toggleVisibility={toggleVisibility}
                    visibilityState={visibleState}
                    toggleFolded={toggleFolded}
                    foldedState={foldedState}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => (bindActionCreators({...ActionCreators}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
