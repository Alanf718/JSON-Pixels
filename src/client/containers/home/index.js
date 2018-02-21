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
            shouldSaveRegion: false
        };
        this.setPrimitiveType = this.setPrimitiveType.bind(this);
        this.setShouldSaveRegion = this.setShouldSaveRegion.bind(this);
    }

    setPrimitiveType(type) {
        this.setState({primitiveType: type});
    }

    setShouldSaveRegion(save) {
        this.setState({shouldSaveRegion: save});
    }

    componentDidMount() {
    }

    render() {
        // const {debug1} = this.props;

        return (
            <div className="frame-tags">
                <RegionSelector
                    shape={this.state.primitiveType}
                    saveRegion={this.state.shouldSaveRegion}
                    saveRegionReset={this.setShouldSaveRegion}
                />
                <SelectedRegion
                    selected={['Im an array!']}
                    handleClick={this.setPrimitiveType}
                    saveRegionClick={this.setShouldSaveRegion}
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return { view: state };
};

const mapDispatchToProps = (dispatch) => (bindActionCreators({...ActionCreators}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
