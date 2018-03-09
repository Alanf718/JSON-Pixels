import React, {Component} from 'react';

import './style.scss';

export class SelectedRegion extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {toggleNodes, toggleNodesState} = this.props;
        return (
            <div className="display zoomed-display">
                <canvas width="320" height="320"/>
                <div className="tool-bar">
                    <button type="button" onClick={() => toggleNodes({state: toggleNodesState})}>Toggle Nodes</button>
                </div>
            </div>
        );
    }
}

export default SelectedRegion;
