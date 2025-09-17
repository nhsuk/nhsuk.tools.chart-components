import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mockedBpClassificationBounds,
  mockedBpGraphLayout,
  mockedBptReading,
} from '@tests/__helpers__/mocks/bp-results';
import { BpChart } from '@components/blood-pressure/bp-chart';

const meta: Meta<typeof BpChart> = {
  title: 'Charts/Blood Pressure/Chart',
  component: BpChart,
};

export default meta;

type Story = StoryObj<typeof BpChart>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/blood-pressure" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Visualizes a blood pressure reading on a chart and indicates the corresponding classification based on defined thresholds.
 *
 * ## Usage
 *
 * ```jsx
 *   <BpChart
 *         bounds={bounds}
 *         reading={{ systolic: 120, diastolic: 80 }}
 *         graphLayout={ graphLayoutProp } />
 * ```
 *
 * ## Properties
 *
 * ### bounds
 * Defines the classification boundaries for systolic and diastolic blood pressure.
 *
 * ```
 * {
 *  systolic: {
 *    lower: 70,
 *    upper: {
 *      [BpClassificationLevel.Low]: {
 *        value: 90,
 *      },
 *      [BpClassificationLevel.Healthy]: {
 *        value: 120,
 *      },
 *      [BpClassificationLevel.SlightlyRaised]: {
 *        value: 140,
 *      },
 *      [BpClassificationLevel.High]: {
 *        value: 180,
 *     },
 *     [BpClassificationLevel.VeryHigh]: {
 *        value: 300,
 *      },
 *    },
 *  },
 *  diastolic: {
 *    lower: 40,
 *    upper: {
 *      [BpClassificationLevel.Low]: {
 *        value: 60,
 *      },
 *      [BpClassificationLevel.Healthy]: {
 *        value: 80,
 *      },
 *      [BpClassificationLevel.SlightlyRaised]: {
 *        value: 90,
 *      },
 *      [BpClassificationLevel.High]: {
 *        value: 120,
 *      },
 *      [BpClassificationLevel.VeryHigh]: {
 *        value: 200,
 *      },
 *    },
 *  },
 * };
 * ```
 * ### reading
 * Represents a blood pressure measurement.
 *
 * `systolic`: A number representing the systolic blood pressure reading.
 *
 * `diastolic`: A number representing the diastolic blood pressure reading.
 *
 * ### graphLayout
 * The layout layout provides a structure for organizing the chart's elements, including the labels for the axes and the grid layout of the chart area.
 *
 * `systolicLabel` and `diastolicLabel`:
 *
 * These properties define the labels for the systolic and diastolic axes of the chart.
 *
 * `rows:`
 *
 * This property defines the rows of the chart grid
 *
 * Each row is represented as an object with the following properties:
 *
 * - `id`: A unique identifier for the row.
 *
 * - `cells`: An array of objects representing the individual cells within the row.
 *
 * Each cell object has the following properties:
 *
 * - `id`: A unique identifier for the cell.
 *
 * - `firstInColumn`: A boolean indicating whether the cell is the first in its column.
 *
 * - `firstInRow`: A boolean indicating whether the cell is the first in its row.
 *
 *
 * ``` {
 * systolicLabel: 'Systolic (high number)',
 * diastolicLabel: 'Diastolic (low number)',
 * rows: [
 *   {
 *     id: '0',
 *     cells: [
 *       { id: '0-0', firstInColumn: true, firstInRow: true },
 *       { id: '0-1', firstInColumn: true, firstInRow: false },
 *       { id: '0-2', firstInColumn: true, firstInRow: false },
 *       { id: '0-3', firstInColumn: true, firstInRow: false },
 *       { id: '0-4', firstInColumn: true, firstInRow: false },
 *       { id: '0-5', firstInColumn: true, firstInRow: false },
 *     ],
 *   },
 * ],
 * };
 * ```
 */
export const Chart: Story = {
  render: () => (
    <BpChart
      bounds={mockedBpClassificationBounds}
      reading={mockedBptReading}
      graphLayout={mockedBpGraphLayout}
    />
  ),
};
