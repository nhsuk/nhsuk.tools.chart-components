import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarSliderChart } from '@components/bar-slider/bar-slider-chart';
import { mockBarSliderConfigExample2 } from '@tests/__helpers__/mocks/bar-slider-results';

const meta: Meta<typeof BarSliderChart> = {
  title: 'Charts/BarSlider/Chart',
  component: BarSliderChart,
};

export default meta;

type Story = StoryObj<typeof BarSliderChart>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/bar-slider" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * ## Usage
 *
 * ```jsx
 *  <BarSliderChart
 *     config={mockBarSliderConfigExample2}
 *     value={35.7}
 *     markerText="Your Result:"
 *   />
 * ```
 * ## Properties
 *
 * ### config
 * Defines the configuration data for the chart. This configuration defines the appearance and behavior of the bar slider.
 *
 * - `name`: A string that identifies the name of the bar slider.
 * - `axis`:
 *  - `ticks`: An array of objects, each representing a tick on the axis.
 *    - `value`: The position of the tick.
 *    - `isVisible`: (Optional) Boolean indicating whether the tick is visible (defaults to `true`)
 * - `segments`: An array of objects, each representing a segment on the slider.
 *  - `start`: (Optional) The starting value of the segment. If not provided, the value is calculated based on the position of the previous segment or the first axis tick.
 *  - `end`:  (Optional) The ending value of the segment. If not provided, the value is calculated based on the position of the next segment or the last axis tick.
 *  - `weight`: (Optional) The weight of the segment. If not provided, the weight is calculated based on the proportional length of the segment.
 *  - `styleSuffix`: The CSS class applied to the segment.
 *  - `legend`:  (Optional) The label for the segment, displayed in a legend.
 *
 *
 * ```json
 * {
 * name: 'nhsuk-bar-slider',
 * axis: {
 *   ticks: [
 *     { value: 0, isVisible: false },
 *     { value: 10 },
 *     { value: 40 },
 *     { value: 60 },
 *     { value: 90 },
 *     { value: 100, isVisible: false },
 *   ],
 * },
 * segments: [
 *   {
 *     start: 0,
 *     end: 10,
 *     styleSuffix: 'cyan',
 *   },
 *   {
 *     start: 10,
 *     end: 40,
 *     styleSuffix: 'yellow',
 *   },
 *   {
 *     start: 40,
 *     end: 60,
 *     styleSuffix: 'red',
 *   },
 *   {
 *     start: 60,
 *     end: 90,
 *     styleSuffix: 'purple',
 *   },
 *   {
 *     start: 90,
 *     end: 100,
 *     styleSuffix: 'green',
 *   },
 *  ],
 * };

 * ```
 * ### value
 *  The value to render on the chart
 *
 * ### markerText
 * This label is used to identify the marker that represents value on the chart.
 *
 * ## Styling
 * The `name` property in the configuration is used as a prefix for all related CSS class.  
 * 
 * This ensures that the styles for the component are specific to the chart and avoid conflicts with other elements on the page.
 * 
 * #### Graph-Specific suffixes:
 * The bar slider component requires CSS class names that are made up of two parts:
 * 
 * - `Chart name`: This is the name of the chart, like "bar-slider".
 * - `Suffix`: This describes the specific style, like `graph` or `arrow-marker`. 
 * 
 * These suffixes denote the purpose and styling of the component.
 * 
 * | Suffix    | Description |
 * | --------- | ----------- |
 * | `-graph`  | Styles for the overall chart dimensions, position, and height. | 
 * | `-arrow-marker` | Styles for arrow markers, including height and position. | 
 * | `-value-axis-marker` | Styles for the result value axis, including position, border, and height.| 
 * | `-value-marker` | Styles for the value labels, including position, color, and other styles.| 
 * | `-label-marker` | Styles for the value marker labels, including position and text content.| 
 * | `-label-align-left, -label-align-right, -label-align-center` | Styles for aligning result labels based on their position within the chart.| 
 * | `-axis-marker-label` | Styles for chart axis labels, including position.| 
 * | `-start-axis-marker-label` | Styles for the starting point of the chart axis label.| 
 * | `-axis-marker` | Styles for chart axis markers, including position.| 
 * | `-start-axis-marker` | Styles for the starting point of the chart axis marker.| 
 * 
 * For a chart named `nhsuk-bar-slider`, the following CSS classes should be used:
 *
 * - nhsuk-bar-slider-graph
 * - nhsuk-bar-slider-arrow-marker
 * - nhsuk-bar-slider-value-axis-marker
 * - nhsuk-bar-slider-value-marker
 * - nhsuk-bar-slider-label-marker
 * - nhsuk-bar-slider-label-align-left
 * - nhsuk-bar-slider-label-align-right
 * - nhsuk-bar-slider-label-align-center
 * - nhsuk-bar-slider-axis-marker-label
 * - nhsuk-bar-slider-start-axis-marker-label
 * - nhsuk-bar-slider-axis-marker
 * - nhsuk-bar-slider-start-axis-marker
 * 
 * #### Segment-Specific Styles:
 * 
 * Each segement the chart requires a  unique CSS class name. This is done by combining the chart name with the `styleSuffix` property of the segment.
 * 
 *  For example, if the name is `nhsuk-bar-slider` and the `segment.styleSuffix` is `cyan`, the final CSS class name will be `nhsuk-bar-slider-cyan`.
 * - `.nhsuk-bar-slider-cyan`: This class extends the base style and adds specific styling for the cyan segment. It includes background color, border, and other visual properties.
 * - `.nhsuk-bar-slider-yellow`: This class extends the base style and adds specific styling for the yellow segment.
 * - `.nhsuk-bar-slider-red`: This class extends the base style and adds specific styling for the red segment.
 * - `%bar-slider-region`: This mixin defines the base style for all bar slider segments. It sets the position, outline, and height of the segment. The height is responsive, adjusting for desktop and mobile views.
 * 
 * **Note:** The z-index property is used to control the layering of segments. Higher z-index values appear on top of lower ones.
 * 
 * ```scss
 *  %nhsuk-bar-slider-region {
 *   position: absolute;
 *   bottom: 0%;
 *   outline: $bar-slider-graph-outline;
 *   height: $bar-slider-graph-height-desktop;
 *
 *   @include for-mobile {
 *     height: $bar-slider-graph-height-mobile;
 *   }
 * }
 *
 * ```
 * ```css
 * .nhsuk-bar-slider-cyan {
 *   @extend %nhsuk-bar-slider-region;
 *   @extend %bar-slider-cyan;
 *   z-index: 4;
 * }
 *
 * .nhsuk-bar-slider-yellow {
 *   @extend %nhsuk-bar-slider-region;
 *   @extend %bar-slider-yellow;
 *   z-index: 3;
 * }
 *
 * .nhsuk-bar-slider-red {
 *   @extend %nhsuk-bar-slider-region;
 *   @extend %bar-slider-red;
 *   z-index: 2;
 * }
 * ```
 * ## Constraints
 *
 * The `constraints` is an optional property that allows you to define limits for the calculated position.
 *
 * - `constraints`: This optional property allows you to define constraints for the calculated position.
 *  - `max`: This object defines a maximum constraint.
 *  - `value`: The maximum value.
 *  - `position`: The desired position to use when the value to be rendered exceeds the max value of the constraint. This is the position that will be used to render the clamped value on the graph.
 *
 * ```json
 * {
 * name: 'nhsuk-bar-slider',
 * axis: {
 *   ticks: [
 *     { value: 0, isVisible: false },
 *     { value: 10 },
 *     { value: 40 },
 *     { value: 60 },
 *     { value: 90 },
 *     { value: 100, isVisible: false },
 *   ],
 * },
 * constraints: {
 *   max: {
 *     value: 0.65,
 *     position: 98,
 *   },
 * },
 * segments: [
 *   {
 *     styleSuffix: 'cyan',
 *   },
 *   {
 *     styleSuffix: 'yellow',
 *   },
 *   {
 *     styleSuffix: 'red',
 *   },
 *   {
 *     styleSuffix: 'purple',
 *   },
 *   {
 *     styleSuffix: 'green',
 *   },
 *  ],
 * };
 *```
 */

export const Chart: Story = {
  render: () => (
    <BarSliderChart
      config={mockBarSliderConfigExample2}
      value={35.7}
      markerText="Your Result:"
    />
  ),
};
