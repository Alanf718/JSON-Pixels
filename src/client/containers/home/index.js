import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from './actions/index';
import {RegionSelector} from './components/region-selector';
import {SelectedRegion} from './components/selected-region';

import './style.scss';
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
        const {regionMode, config} = this.props;

        return (
            <div className="frame-tags">
                <div>
                    <RegionSelector
                        shape={this.state.primitiveType}
                        saveRegion={this.state.shouldSaveRegion}
                        saveRegionReset={this.setShouldSaveRegion}
                        setLayers={this.setLayers}
                        prevLayer={this.state.prevLayer}
                        prevLayerReset={this.prevLayer}
                        nextLayer={this.state.nextLayer}
                        nextLayerReset={this.nextLayer}
                        toggleNodes={this.state.toggleNodes}
                        toggleNodesReset={this.toggleNodes}
                    />
                    <button onClick={() => regionMode({mode: 'rectangle'})}>Rectangle</button>
                    <button onClick={() => regionMode({mode: 'polygon'})}>Polygon</button>

                    <pre id="debug">
                        {JSON.stringify(config)}
                    </pre>
                </div>
                <SelectedRegion
                    numberOfLayers={this.state.numberOfLayers}
                    layerIndex={this.state.layerIndex}
                    handleClick={this.setPrimitiveType}
                    saveRegionClick={this.setShouldSaveRegion}
                    prevLayerClick={this.prevLayer}
                    nextLayerClick={this.nextLayer}
                    toggleNodesClick={this.toggleNodes}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => (bindActionCreators({...ActionCreators}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
