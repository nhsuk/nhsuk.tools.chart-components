import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartLegend } from '@components/chart-legend';
import { BmiChartMarkerIcon } from '@components/bmi/bmi-chart-marker-icon';

/**
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Chart legend with styles for each legend key
 * ## Usage
 *
 * ```jsx
 * <ChartLegend
 *     borderWrapper
 *     legendKeys={[
 *       {
 *         text: 'First item',
 *         className: `nhsuk-cbmi-legend-key-classification-underweight`,
 *       },
 *       {
 *         text: 'Second item',
 *         className: `nhsuk-cbmi-legend-key-classification-healthy`,
 *       },
 *       {
 *         text: 'Third item',
 *         className: `nhsuk-cbmi-legend-key-classification-overweight`,
 *       }
 *     ]}
 *   />
 * ```
 * ## Properties
 *
 * ### borderWrapper
 *
 * Controls whether a border wrapper is applied around the legend items.
 *
 * ### legendKeys
 * Defines the items that will be displayed in the legend.
 *
 * Each object in the array represents a legend item and has the following properties:
 *
 * - `text`: The text label that will be displayed for the legend item.
 *
 * - `className`: A CSS class that can be used to style the legend item. In this example, the classes are used to indicate different BMI classifications (underweight, healthy, overweight).
 *
 * - `element`: (Optional) A React component that can be rendered instead of the default text label.
 *
 */

const meta: Meta<typeof ChartLegend> = {
  title: 'Legend',
  component: ChartLegend,
};

export default meta;
type Story = StoryObj<typeof ChartLegend>;

export const WithBorder: Story = {
  args: {
    borderWrapper: true,
    legendKeys: [
      {
        text: 'First item',
        className: `nhsuk-cbmi-legend-key-classification-underweight`,
      },
      {
        text: 'Second item',
        className: `nhsuk-cbmi-legend-key-classification-healthy`,
      },
      {
        text: 'Third item',
        className: `nhsuk-cbmi-legend-key-classification-overweight`,
      },
    ],
  },
};

export const Borderless: Story = {
  args: {
    borderWrapper: false,
    legendKeys: [
      {
        text: 'First item',
        className: `nhsuk-cbmi-legend-key-classification-underweight`,
      },
      {
        text: 'Second item',
        className: `nhsuk-cbmi-legend-key-classification-healthy`,
      },
      {
        text: 'Third item',
        className: `nhsuk-cbmi-legend-key-classification-overweight`,
      },
    ],
  },
};

export const KeyWithElement: Story = {
  args: {
    borderWrapper: false,
    legendKeys: [
      {
        text: 'First item',
        className: `nhsuk-cbmi-legend-key-classification-underweight`,
      },
      {
        text: 'Second item',
        className: `nhsuk-cbmi-legend-key-classification-healthy`,
      },
      {
        text: 'Third item',
        className: `nhsuk-cbmi-legend-key-classification-overweight`,
      },
      {
        text: 'Your Result',
        className: `nhsuk-bmi-legend-key-marker`,
        element: <BmiChartMarkerIcon />,
      },
    ],
  },
};
