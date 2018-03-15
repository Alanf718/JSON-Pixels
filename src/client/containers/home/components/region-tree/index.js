import React, {Component} from 'react';

import './style.scss';
import { RegionTreeNode } from '../region-tree-node';

export class RegionTree extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {regions} = this.props;

        return (
            <div className="region-tree">
                {
                    regions.map(child => {
                        return (
                            <RegionTreeNode
                                name={child.name}
                                visible={child.visible}
                                key={child.id}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default RegionTree;
