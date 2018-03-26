import React from 'react'
import ReactDOM from 'react-dom';
import { Measure, Viewport } from 'react-measure'
import Tooltip from './Tooltip';
import raf from 'raf';

/**
 * @name Wrapper
 * @description The wrapper component is responsible for wrapping the tooltip
 * and trigger, as well as measuring each. It renders the children as provided, except
 * that it also wraps it in a inline-block div, which is explained later. It renders
 * the actual tooltip as a portal, also explained later. It provides the measurements
 * of both the trigger and the tooltip to the tooltip, which is used to position the tooltip
 * as well as make sure the tooltip is on screen.
 */
const observer = new IntersectionObserver((entries) => { 
  console.log('yolo');
  entries.forEach(entry => console.log(entry.target, entry. intersectionRatio));
}); 

class Wrapper extends React.Component {
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
    const tick = () => {
      const rect = this.triggerRef.getBoundingClientRect();
      console.log(rect.left);
      raf(tick);
    }

    raf(tick);
  }

  render() {
    return (
      <div>
        {/**
          * Creates a react portal for the tooltip. A portal lets us
          * render something in the body instead of as a child of the parent
          * of this component. https://reactjs.org/docs/portals.html
          */}
        {/*ReactDOM.createPortal(
          <Viewport>
            {(viewport) => (
              <Tooltip 
                innerRef={bind('content').ref}
                contentWidth={measurements && measurements.content.width}
                contentHeight={measurements && measurements.content.height}
                triggerX={measurements && measurements.trigger.left}
                triggerY={measurements && measurements.trigger.top}
                triggerWidth={measurements && measurements.trigger.width}
                triggerHeight={measurements && measurements.trigger.height}
                viewportWidth={viewport.width}
                viewportHeight={viewport.height}
              >
                {this.props.content}
              </Tooltip>
            )}
          </Viewport>
          ,window.document.body)*/}

        {/**
          * We need to render the children passed to the wrapper, but we need to wrap
          * it in a div so we measure it.
          * 
          * It's important here that we use display: inline-block. This is because we
          * need to use either block or inline-block, because the ReactObserver spec
          * doesn't support display inline. We also don't want to screw with the user's
          * formatting, so we don't want block.
          * https://wicg.github.io/ResizeObserver/#intro
          */}
          <div style={{ display: 'inline-block' }} ref={ref => this.triggerRef = ref}>
            {this.props.children}
          </div>
        {/*<div style={{ display: 'inline-block' }} {...bind('trigger')}>
          {this.props.children}
        </div>*/}
      </div>
    );
  }
  // render() {
  //   return (
  //     <Measure>
  //       {({ bind, measurements }) => {
  //         // console.log('measurements', measurements);
  //         return (
  //           <div>
  //             {/**
  //               * Creates a react portal for the tooltip. A portal lets us
  //               * render something in the body instead of as a child of the parent
  //               * of this component. https://reactjs.org/docs/portals.html
  //               */}
  //             {/*ReactDOM.createPortal(
  //               <Viewport>
  //                 {(viewport) => (
  //                   <Tooltip 
  //                     innerRef={bind('content').ref}
  //                     contentWidth={measurements && measurements.content.width}
  //                     contentHeight={measurements && measurements.content.height}
  //                     triggerX={measurements && measurements.trigger.left}
  //                     triggerY={measurements && measurements.trigger.top}
  //                     triggerWidth={measurements && measurements.trigger.width}
  //                     triggerHeight={measurements && measurements.trigger.height}
  //                     viewportWidth={viewport.width}
  //                     viewportHeight={viewport.height}
  //                   >
  //                     {this.props.content}
  //                   </Tooltip>
  //                 )}
  //               </Viewport>
  //               ,window.document.body)*/}

  //             {/**
  //               * We need to render the children passed to the wrapper, but we need to wrap
  //               * it in a div so we measure it.
  //               * 
  //               * It's important here that we use display: inline-block. This is because we
  //               * need to use either block or inline-block, because the ReactObserver spec
  //               * doesn't support display inline. We also don't want to screw with the user's
  //               * formatting, so we don't want block.
  //               * https://wicg.github.io/ResizeObserver/#intro
  //               */}
  //               <div style={{ display: 'inline-block' }} ref={(node) => observer.observe(node)}>
  //                 {this.props.children}
  //               </div>
  //             {/*<div style={{ display: 'inline-block' }} {...bind('trigger')}>
  //               {this.props.children}
  //             </div>*/}
  //           </div>
  //         );
  //       }}
  //     </Measure>
  //   );
  // }
}


export default Wrapper;

// import React from 'react';
// import { createPortal } from 'react-dom';
// import { Measure, Viewport } from 'react-measure';
// import styled from 'styled-components';
// import Tooltip from './Tooltip';

// const Bla = styled.div``;

// class Wrapper extends React.PureComponent {
//   static displayName = 'TooltipWrapepr'
//   state = {
//     message: 'bb'
//   }
//   componentDidMount() {
//     setInterval(() => {
//       this.setState(state => ({ message: state.message + 'a' }))
//     }, 1000);
//   }
//   render() {
//     return (
//       <Measure onMeasure={(...args) => { console.log('onMeasure', ...args) }}>
//         {({ bind, measurements }) => {
//           console.log('render', measurements && measurements.trigger.width);
//           return (
//             <div>

//               <Bla innerRef={bind('trigger').ref}>
//                 {this.state.message}
//                 {/* this.props.children */}
//               </Bla>
//             </div>
//           )
//         }}
//       </Measure>
//     )
//   }
// }
//               // {createPortal(
//               //   // <Viewport>
//               //     // {(viewport) => (
//               //       <Tooltip 
//               //         innerRef={bind('content').ref}
//               //         contentWidth={measurements && measurements.content.width}
//               //         contentHeight={measurements && measurements.content.height}
//               //         triggerX={measurements && measurements.trigger.left}
//               //         triggerY={measurements && measurements.trigger.top}
//               //         triggerWidth={measurements && measurements.trigger.width}
//               //         triggerHeight={measurements && measurements.trigger.height}
//               //         // viewportWidth={viewport.width}
//               //         // viewportHeight={viewport.height}
//               //       >
//               //         {this.props.content}
//               //       </Tooltip>
//               //     // )}
//               //   // </Viewport>
//               // ,window.document.body)}
// export default Wrapper;
