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
        let isChild = false;        
        let childCounter = 0;
        let folded = false;
        let renderOnce = false;

        return (
            <div className="region-tree">
                {
                    regions.map(child => {
                        index++;
                        renderOnce = false;

                        if (childCounter > 0) {
                            isChild = 'child';
                            childCounter--;
                        } else {
                            isChild = false;
                            folded = false;
                        }

                        if (child.type === REGION_TYPE_GROUP) {
                            childCounter += child.numberOfChildren;
                            isChild = false;
                            if (child.folded && !folded) {
                                folded = true;
                                renderOnce = true;
                            }
                        }

                        const selected = selectedID === child.id ? true : false;
                        const isReadonly = selected && !readonly ? false : 'readonly';
                        const visible = !folded || renderOnce ? true : false;

                        return (
                            <RegionTreeNode
                                name={child.name}
                                visible={visible}
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
