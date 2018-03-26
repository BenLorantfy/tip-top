import React from 'react';
import styled from 'styled-components';
import { calculateTooltipBBox } from './utils';

const Container = styled.div`
  position: fixed;
  background-color: red;
  top: ${props => props.bbox ? `${props.bbox.y}px` : 0};
  left: ${props => props.bbox ? `${props.bbox.x}px` : 0};
  opacity: ${props => props.bbox ? 1 : 0};
`;

class Tooltip extends React.PureComponent {
  static displayName = 'Tooltip'
  state = {}

  componentWillReceiveProps(nextProps) {
    const bbox = calculateTooltipBBox({
      placement: 'top',
      offset: 10,
      contentWidth: nextProps.contentWidth, 
      contentHeight: nextProps.contentHeight,
      triggerX: nextProps.triggerX,
      triggerY: nextProps.triggerY,
      triggerWidth: nextProps.triggerWidth,
      triggerHeight: nextProps.triggerHeight,
    });

    this.setState({ bbox });
    console.log('nextProps', nextProps);
    console.log('bbox', bbox);
  }
  
  render() {
    return (
      <Container 
        innerRef={this.props.innerRef}
        bbox={this.state.bbox}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Tooltip;
