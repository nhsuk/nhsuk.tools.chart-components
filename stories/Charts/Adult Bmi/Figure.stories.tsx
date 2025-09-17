import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockedBmiClassificationBounds } from '@tests/__helpers__/mocks/bmi-results';
import { BmiChartFigure } from '@components/bmi/bmi-figure-chart';

const meta: Meta<typeof BmiChartFigure> = {
  title: 'Charts/Adult Bmi/Figure',
  component: BmiChartFigure,
};

export default meta;

type Story = StoryObj<typeof BmiChartFigure>;
/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/bmi" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Display a visual representation of an adult's BMI, including a chart, markers, and labels.
 *
 * ## Usage
 *
 * ```jsx
 *  <BmiChartFigure
 *     ariaLabel="Your body mass index result is shown on a chart here. A full description can be found in the text below it."
 *     classificationBounds={classificationBounds}
 *     bmi={19.4}
 *     legendMarkerText="Your BMI"
 *     legendKeys={{
 *       underweight: 'Underweight',
 *       healthy: 'Healthy',
 *       overweight: 'Overweight',
 *       obese: 'Obese',
 *     }}
 *   />
 * ```
 *
 * ## Properties
 *
 * ### classificationBounds
 * Defines the boundaries for different BMI classifications.
 *
 *  This property provides a structured way to define the ranges for different BMI classifications, including both the numerical values and the corresponding labels for display.
 *
 * ```
 * {
 *  lower: 0,
 *  upper: {
 *    [BmiClassification.Underweight]: {
 *      value: 18.5,
 *      label: '18.4',
 *    },
 *    [BmiClassification.Healthy]: {
 *      value: 25,
 *      label: '24.9',
 *    },
 *    [BmiClassification.Overweight]: {
 *      value: 30,
 *      label: '29.9',
 *    },
 *    [BmiClassification.Obese1]: {
 *      value: 35,
 *      label: '34.9',
 *    },
 *    [BmiClassification.Obese2]: {
 *      value: 40,
 *      label: '39.9',
 *    }
 *  },
 *};
 * ```
 * ### bmi
 * This property represents a person's Body Mass Index (BMI), which is a calculation that estimates body fat based on height and weight.
 *
 * ### ariaLabel
 * This property provides a textual description  of the figure for screen readers.
 *
 * ### legendMarkerText
 * Sets the text label for the legend marker.
 *
 * This label identifies the data represented in the chart as the user's BMI.
 *
 * ### legendKeys
 * Defines the labels for different BMI categories.
 *
 * This property maps BMI categories to their corresponding labels, which will be displayed in the chart's legend.
 */

export const Figure: Story = {
  render: () => (
    <BmiChartFigure
      ariaLabel="Your body mass index result is shown on a chart here. A full description can be found in the text below it."
      classificationBounds={mockedBmiClassificationBounds}
      bmi={19.4}
      legendMarkerText="Your BMI"
      legendKeys={{
        underweight: 'Underweight',
        healthy: 'Healthy',
        overweight: 'Overweight',
        obese: 'Obese',
      }}
    />
  ),
};
