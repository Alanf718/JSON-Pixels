import React, {Component} from 'react';

import './style.scss';
import { convertRegionTypeToMode } from '../../functions/utilities/converters';

export class RegionTreeNode extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.updateSelectedRegion({index: this.index});
        this.updateSelectedRegionID({});
        this.updateRegionMode({mode: convertRegionTypeToMode(this.type)});
    }

    onChange(evt) {
        this.saveName({value: evt.target.value});
    }

    componentDidMount() {
    }

    /*eslint-disable*/
    render() {
        const {name, visible, index, id, selected, type, readonly,
            updateSelectedRegion, updateSelectedRegionID, updateRegionMode,
            saveName} = this.props;
        this.index = index;
        this.id = id;
        this.type = type;
        this.updateSelectedRegion = updateSelectedRegion;
        this.updateSelectedRegionID = updateSelectedRegionID;
        this.updateRegionMode = updateRegionMode;
        this.saveName = saveName;

        const visibleClass = !visible ? 'hidden ' : '';
        const selectedClass = selected ? 'selected ' : '';
        const readonlyClass = !readonly ? 'editable ' : readonly + ' ';
        return (
            <div onClick={() => this.onClick()}
                className={visibleClass + selectedClass + 'region-tree-node'}
                key={id}
            >
                <input className={readonlyClass + "node-name"} type="text" readOnly={readonly} 
                value={name} onChange={this.onChange}></input>
            </div>
        );
    }
}

export default RegionTreeNode;
