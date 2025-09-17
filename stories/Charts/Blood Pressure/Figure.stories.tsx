import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mockedBpClassificationBounds,
  mockedBpGraphLayout,
} from '@tests/__helpers__/mocks/bp-results';
import { BpChartFigure } from '@components/blood-pressure/bp-figure-chart';

const meta: Meta<typeof BpChartFigure> = {
  title: 'Charts/Blood Pressure/Figure',
  component: BpChartFigure,
};

export default meta;

type Story = StoryObj<typeof BpChartFigure>;

/**
 *
 * This component can be found in the `nhsuk-tools-chart-components` repository <a href="https://github.com/NHSDigital/nhsuk-tools-chart-components/tree/main/src/components/blood-pressure" target="_blank" rel="noopener noreferrer">here</a>.
 *
 * Visualizes a blood pressure reading on a chart and indicates the corresponding classification based on defined thresholds.
 *
 * ## Usage
 *
 * ```jsx
 *   <BpChartFigure
 *     ariaLabel="Your blood pressure reading is shown on a chart here. A full description can be found in the text below it."
 *     bounds={classificationBounds}
 *     reading={{ systolic: 122, diastolic: 76 }}
 *     graphLayout={graphLayout}
 *     legendMarkerText="Your reading"
 *     legendKeys={{
 *       high: 'High',
 *       slightlyraised: 'Slightly raised',
 *       healthy: 'Healthy',
 *       low: 'Low',
 *     }}
 *   />
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
 *
 * ### ariaLabel
 * This property provides a textual description of the figure for screen readers.
 *
 * ### legendMarkerText
 * Sets the text label for the legend marker.
 *
 * This label identifies the data represented in the chart as the user's blood pressure reading.
 *
 * ### legendKeys
 * Defines the labels for different classification categories.
 *
 * This property maps blood pressure categories to their corresponding labels, which will be displayed in the chart's legend.
 */

export const Figure: Story = {
  render: () => (
    <BpChartFigure
      ariaLabel="Your blood pressure reading is shown on a chart here. A full description can be found in the text below it."
      bounds={mockedBpClassificationBounds}
      reading={{ systolic: 122, diastolic: 76 }}
      graphLayout={mockedBpGraphLayout}
      legendMarkerText="Your reading"
      legendKeys={{
        high: 'High',
        slightlyraised: 'Slightly raised',
        healthy: 'Healthy',
        low: 'Low',
      }}
    />
  ),
};
