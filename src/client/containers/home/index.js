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
        this.state = {
            primitiveType: 'rect',
            shouldSaveRegion: false,
            prevLayer: false,
            nextLayer: false,
            numberOfLayers: 1,
            layerIndex: 0,
            toggleNodes: false
        };
        this.setPrimitiveType = this.setPrimitiveType.bind(this);
        this.setShouldSaveRegion = this.setShouldSaveRegion.bind(this);
        this.setLayers = this.setLayers.bind(this);
        this.prevLayer = this.prevLayer.bind(this);
        this.nextLayer = this.nextLayer.bind(this);
        this.toggleNodes = this.toggleNodes.bind(this);
    }

    setPrimitiveType(type) {
        this.setState({primitiveType: type});
    }

    setShouldSaveRegion(save) {
        this.setState({shouldSaveRegion: save});
    }

    setLayers(layers, index) {
        this.setState({numberOfLayers: layers, layerIndex: index});
    }

    prevLayer(set) {
        this.setState({prevLayer: set});
    }

    nextLayer(set) {
        this.setState({nextLayer: set});
    }

    toggleNodes(set) {
        this.setState({toggleNodes: set});
    }

    render() {
        const {regionMode, config, toggleNodes, toggleSaveRegion, regions,
            layers, addRegion, removeRegion, saveRegion} = this.props;
        //Validity check for selected region
        const toggleNodesState =
            (regions.config.selectedRegion > 0 && regions.config.selectedRegion < regions.list.length)
                ? regions.list[regions.config.selectedRegion].showNodes
                : false;

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
                    />
                    <button onClick={() => regionMode({mode: REGION_MODE_RECTANGLE})}>Rectangle</button>
                    <button onClick={() => regionMode({mode: REGION_MODE_POLYGON})}>Polygon</button>

                    <pre id="debug">
                        {JSON.stringify(config)}
                    </pre>
                </div>
                <SelectedRegion
                    toggleSaveRegion={toggleSaveRegion}
                    toggleSaveRegionState={!config.saveRegion}
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
