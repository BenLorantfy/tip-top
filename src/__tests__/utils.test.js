import { calculateTooltipBBox } from '../utils';
import * as fixtures from './__fixtures__';

describe('calculateTooltipBBox', () => {
  it('should calculate bbox for top', () => {
    const bbox = calculateTooltipBBox({
      placement: 'top',
      ...fixtures.measurements,
    });

    expect(bbox).toEqual({
      x: 450,
      y: 475,
      width: fixtures.measurements.contentWidth,
      height: fixtures.measurements.contentHeight,
    });
  })
})