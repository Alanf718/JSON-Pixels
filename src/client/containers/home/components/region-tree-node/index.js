import React, {Component} from 'react';

import './style.scss';

export class RegionTreeNode extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {name, visible, id} = this.props;
        let className = !visible ? 'hidden ' : '';
        return (
            <div
                className={className + 'region-tree-node'}
                key={id}
            >
                <p>{name}</p>
            </div>
        );
    }
}

export default RegionTreeNode;
