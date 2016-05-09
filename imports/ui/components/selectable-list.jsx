import React from 'react';
import { List, MakeSelectable as makeSelectable } from 'material-ui/List';

export let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  class ComposedClass extends React.Component {
    constructor(props) {
      super(props);

      this.handleRequestChange = this.handleRequestChange.bind(this);
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  }

  ComposedClass.propTypes = {
    children: React.PropTypes.node.isRequired,
    defaultValue: React.PropTypes.string.isRequired,
  };

  return ComposedClass;
}

SelectableList = wrapState(SelectableList);
