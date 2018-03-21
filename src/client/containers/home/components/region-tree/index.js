import React, {Component} from 'react';

import './style.scss';
import { RegionTreeNode } from '../region-tree-node';
import { REGION_TYPE_GROUP } from '../../constants';

export class RegionTree extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    /*eslint-disable*/
    render() {
        const {regions, selectedID, updateSelectedRegion, updateSelectedRegionID,
            regionMode, readonly, saveName, toggleNodes} = this.props;
        let index = -1;
        let childCounter = 0;
        return (
            <div className="region-tree">
                {
                    regions.map(child => {
                        index++;
                        let isChild = childCounter > 0 ? 'child' : false;
                        childCounter = childCounter > 0 ? childCounter - 1 : 0;
                        
                        if (child.type === REGION_TYPE_GROUP) {
                            childCounter += child.numberOfChildren;
                            isChild = false;
                        }
                        const selected = selectedID === child.id ? true : false;
                        const isReadonly = selected && !readonly ? false : 'readonly';

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
                                grouped={isChild}
                                updateSelectedRegion={updateSelectedRegion}
                                updateSelectedRegionID={updateSelectedRegionID}
                                updateRegionMode={regionMode}
                                saveName={saveName}
                                toggleNodes={toggleNodes}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default RegionTree;
