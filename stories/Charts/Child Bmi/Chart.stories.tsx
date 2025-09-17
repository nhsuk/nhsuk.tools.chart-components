import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockedChildBmiClassificationBounds } from '@tests/__helpers__/mocks/cbmi-results';
import { ChildBmiChart } from '@components/child-bmi/cbmi-chart';

const meta: Meta<typeof ChildBmiChart> = {
  title: 'Charts/Child Bmi/Chart',
  component: ChildBmiChart,
};

export default meta;

type Story = StoryObj<typeof ChildBmiChart>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/child-bmi" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * It visualizes a Child's Body Mass Index (BMI) on a chart.
 *
 * ## Usage
 *
 * ```jsx
 *   <ChildBmiChart
 *     classificationBounds={classificationBounds}
 *     centile={{ value: 1, label: 'Below 2' }}
 *     markerText="The centile:"
 *   />
 * ```
 *
 * ## Properties
 *
 * ### classificationBounds
 * Defines the boundaries for different BMI classifications.
 *
 * This property provides a structured way to define the ranges for different BMI classifications, including both the numerical values and the corresponding labels for display.
 *
 * ```
 * {
 *  lower: 0,
 *  upper: {
 *    [BaseClassifications.Underweight]: {
 *      value: 2,
 *      label: '2',
 *    },
 *    [BaseClassifications.Healthy]: {
 *      value: 91,
 *      label: '91',
 *    },
 *    [BaseClassifications.Overweight]: {
 *      value: 100,
 *      label: '100',
 *    },
 *  },
 * };
 * ```
 * ### centile
 *  Represents the child BMI centile score.
 *
 *  It consists of the numerical value and a textual description of the percentile score
 */

export const Chart: Story = {
  render: () => (
    <ChildBmiChart
      classificationBounds={mockedChildBmiClassificationBounds}
      centile={{ value: 1, label: 'Below 2' }}
      markerText="The centile:"
    />
  ),
};
