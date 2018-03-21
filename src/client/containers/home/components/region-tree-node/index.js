import React, {Component} from 'react';

import './style.scss';
import { convertRegionTypeToMode } from '../../functions/utilities/converters';
import { REGION_MODE_GROUP } from '../../actions';

export class RegionTreeNode extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        const mode = convertRegionTypeToMode(this.type);
        this.updateSelectedRegion({index: this.index});
        this.updateSelectedRegionID({});
        this.updateRegionMode({mode: mode});
        if (mode === REGION_MODE_GROUP) {
            this.toggleNodes({state: false});
        }
    }

    onChange(evt) {
        this.saveName({value: evt.target.value});
    }

    componentDidMount() {
    }

    /*eslint-disable*/
    render() {
        const {name, visible, index, id, selected, type, readonly, grouped,
            updateSelectedRegion, updateSelectedRegionID, updateRegionMode,
            saveName, toggleNodes} = this.props;
        this.index = index;
        this.id = id;
        this.type = type;
        this.updateSelectedRegion = updateSelectedRegion;
        this.updateSelectedRegionID = updateSelectedRegionID;
        this.updateRegionMode = updateRegionMode;
        this.toggleNodes = toggleNodes;
        this.saveName = saveName;

        const visibleClass = !visible ? 'hidden ' : '';
        const selectedClass = selected ? 'selected ' : '';
        const readonlyClass = !readonly ? 'editable ' : readonly + ' ';
        const childClass = !grouped ? '' : grouped + ' ';
        return (
            <div onClick={() => this.onClick()}
                className={visibleClass + selectedClass + childClass + 'region-tree-node'}
                key={id}
            >
                <input className={readonlyClass + "node-name"} type="text" readOnly={readonly} 
                value={name} onChange={this.onChange}></input>
            </div>
        );
    }
}

export default RegionTreeNode;
