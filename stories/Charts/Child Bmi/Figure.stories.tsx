import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockedChildBmiClassificationBounds } from '@tests/__helpers__/mocks/cbmi-results';
import { ChildBmiChartFigure } from '@components/child-bmi/cbmi-figure-chart';

const meta: Meta<typeof ChildBmiChartFigure> = {
  title: 'Charts/Child Bmi/Figure',
  component: ChildBmiChartFigure,
};

export default meta;

type Story = StoryObj<typeof ChildBmiChartFigure>;
/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/child-bmi" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Display a visual representation of a Child's BMI, including a chart, markers, and labels.
 *
 * ## Usage
 *
 * ```jsx
 *  <ChildBmiChartFigure
 *     ariaLabel="Your child's body mass index result is shown on a chart here. A full description can be found in the text below it"
 *     classificationBounds={classificationBounds}
 *     centile={{ value: 1, label: 'Below 2' }}
 *     centileMarkerText="The centile:"
 *     legendKeys={{
 *       underweight: 'Underweight range',
 *       healthy: 'Healthy weight range',
 *       overweight: 'Overweight range',
 *     }}
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
 * ### ariaLabel
 * This property provides a textual description  of the figure for screen readers.
 *
 * ### centileMarkerText
 * This label is used to identify the marker that represents the child's BMI percentile on the chart.
 *
 * ### centile
 *  Represents the child BMI centile score.
 *
 *  It consists of the numerical value and a textual description of the percentile score
 *
 * ### legendKeys
 * Defines the labels for different BMI categories.
 *
 * This property maps BMI categories to their corresponding labels, which will be displayed in the chart's legend.
 *
 */

export const Figure: Story = {
  render: () => (
    <ChildBmiChartFigure
      ariaLabel="Your child's body mass index result is shown on a chart here. A full description can be found in the text below it"
      classificationBounds={mockedChildBmiClassificationBounds}
      centile={{ value: 1, label: 'Below 2' }}
      centileMarkerText="The centile:"
      legendKeys={{
        underweight: 'Underweight range',
        healthy: 'Healthy weight range',
        overweight: 'Overweight range',
      }}
    />
  ),
};
