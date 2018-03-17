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
        const {regions, selectedID, updateSelectedRegion, updateSelectedRegionID,
            regionMode, readonly, saveName} = this.props;
        let index = -1;
        return (
            <div className="region-tree">
                {
                    regions.map(child => {
                        const selected = selectedID === child.id ? true : false;
                        const isReadonly = selected && !readonly ? false : 'readonly';
                        index++;
                        return (
                            <RegionTreeNode
                                name={child.name}
                                visible={child.visible}
                                index={index}
                                id={child.id}
                                key={child.id}
                                type={child.type}
                                selected={selected}
                                readonly={isReadonly}
                                updateSelectedRegion={updateSelectedRegion}
                                updateSelectedRegionID={updateSelectedRegionID}
                                updateRegionMode={regionMode}
                                saveName={saveName}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default RegionTree;
