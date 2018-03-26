export const measureNode = (node) => node.getBoundingClientRect();
export const measureViewport = () => ({ width: window.innerWidth, height: window.innerHeight });

export const calculateTooltipBBox = ({ 
  placement, 
  contentWidth, 
  contentHeight,
  triggerX,
  triggerY,
  triggerWidth,
  triggerHeight,
  offset,
}) => {
  if (placement === 'top') {
    /**
     * If the placement is 'top', we want to get a bbox
     * centered above the trigger. The x,y should be the top left
     * corner
     *     ____________________________
     *    |                            |
     *    |          x___              |
     *    |          |___|             | 
     *    |            |               |
     *    |         TRIGGER            | 
     *    |                            | 
     *    |                            | 
     *    |____________________________|
     */
    return {
      x: (triggerX + (triggerWidth / 2)) - contentWidth / 2,
      y: triggerY - offset - contentHeight,
      width: contentWidth,
      height: contentHeight,
    }
  }
}