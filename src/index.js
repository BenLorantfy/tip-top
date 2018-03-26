import React from 'react'
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';
import raf from 'raf';
import { measureNode, measureViewport } from './utils';

/**
 * @name Wrapper
 * @description The wrapper component is responsible for wrapping the tooltip
 * and trigger, as well as measuring each. It renders the children as provided, except
 * that it also wraps it in a inline-block div, which is explained later. It renders
 * the actual tooltip as a portal, also explained later. It provides the measurements
 * of both the trigger and the tooltip to the tooltip, which is used to position the tooltip
 * as well as make sure the tooltip is on screen.
 */
class Wrapper extends React.Component {
  state = {}

  /**
   * Uses requestAnimationFrame to do our measuring every frame. Here's a litte
   * reasoning of why we decided this method. 
   * 
   * There's a few ways to detect changes to the size of DOM content. One way
   * is to use a ResizeObserver, which there is a polyfill available for. This 
   * works pretty good, except it only detects resizes, not position changes.
   * We need a second observer, a "PositionObserver", which does not exist.
   * I suspect you could write a "PositionObserver", because there is a MutationObserver.
   * You could listen to mutation events for every parent of a child you want to measure,
   * and also attach scroll listeners. 
   * 
   * However, this wouldn't catch everything (for example, CSS transitions), and a big
   * part of this library is being robust. I might still write a PositionObserver, but
   * it would probably be its own library.
   * 
   * I also don't think this method is too bad, because we're only going to run
   * requestAnimationFrame while the tooltip is open, which realistically will
   * only be for a couple seconds.
   */
  componentDidMount() {
    if (this.props.open) {
      this.startMeasuring();
    }
  }

  componentWillUnmount() {
    this.stopMeasuring();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.startMeasuring();
    }

    if (this.props.open && !nextProps.open) {
      this.stopMeasuring();
    }
  }

  startMeasuring() {
    this.stopMeasuring();

    const tick = () => {
      const triggerRect = measureNode(this.triggerRef);
      const contentRect = measureNode(this.contentRef);
      const viewport = measureViewport();

      this.setState({
        contentWidth: contentRect.width,
        contentHeight: contentRect.height,
        triggerX: triggerRect.left,
        triggerY: triggerRect.top,
        triggerWidth: triggerRect.width,
        triggerHeight: triggerRect.height,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height
      });
      
      this.rafHandle = raf(tick);
    }

    this.rafHandle = raf(tick);
  }

  stopMeasuring() {
    if (this.rafHandle) {
      raf.cancel(this.rafHandle);
    }
  }

  render() {
    return (
      <div>
        {/**
          * Creates a react portal for the tooltip. A portal lets us
          * render something in the body instead of as a child of the parent
          * of this component. https://reactjs.org/docs/portals.html
          */}
        {ReactDOM.createPortal(
          <Tooltip 
            innerRef={ref => this.contentRef = ref}
            contentWidth={this.state.contentWidth}
            contentHeight={this.state.contentHeight}
            triggerX={this.state.triggerX}
            triggerY={this.state.triggerY}
            triggerWidth={this.state.triggerWidth}
            triggerHeight={this.state.triggerHeight}
            viewportWidth={this.state.viewportWidth}
            viewportHeight={this.state.viewportHeight}
          >
            {this.props.content}
          </Tooltip>
          ,window.document.body)}

        {/**
          * We need to render the children passed to the wrapper, but we need to wrap
          * it in a div so we can measure it.
          */}
          <div style={{ display: 'inline-block' }} ref={ref => this.triggerRef = ref}>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default Wrapper;
