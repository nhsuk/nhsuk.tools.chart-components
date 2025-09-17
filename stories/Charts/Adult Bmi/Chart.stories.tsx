import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockedBmiClassificationBounds } from '@tests/__helpers__/mocks/bmi-results';
import { BmiChart } from '@components/bmi/bmi-chart';

const meta: Meta<typeof BmiChart> = {
  title: 'Charts/Adult Bmi/Chart',
  component: BmiChart,
};

export default meta;

type Story = StoryObj<typeof BmiChart>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/bmi" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * It visualizes an individual's Body Mass Index (BMI) on a chart.
 *
 * ## Usage
 *
 * ```jsx
 *   <BmiChart classificationBounds={classificationBounds} bmi={19.4} />
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
 */

export const Chart: Story = {
  render: () => (
    <BmiChart classificationBounds={mockedBmiClassificationBounds} bmi={19.4} />
  ),
};
