import React, { JSX } from 'react';
import { Card } from 'nhsuk-react-components';
import './styles/chart-legend.scss';

/**
 * The ChartLegendKey type
 *
 * @param {string} className -  Optional: The classname of the legend key
 * @param {string} wrapperClassName - Optional: The wrapper classname for the card component
 * @param {string} text - The text of the legend key
 * @param {BmiLegendKeys} JSX.Element - Optional: A JSX.Element of the legend key
 */
export type ChartLegendKey = {
  className?: string;
  wrapperClassName?: string;
  text: string;
  element?: JSX.Element;
};

function ChartLegendKeyComponent({
  element,
  text,
  className,
  wrapperClassName,
}: Readonly<ChartLegendKey>): JSX.Element {
  return (
    <div className={`nhsuk-chart-legend-key-wrapper ${wrapperClassName ?? ''}`}>
      <div className={`nhsuk-chart-legend-key ${className ?? ''}`}>
        {element}
      </div>
      {text}
    </div>
  );
}

/**
 * A function to render the chart legend with borders
 * @param {ChartLegendKey[]} legendKey - The legend key item to be rendered
 * @param {stirng} className - The classname for thr components
 */
function ChartLegendBorderedComponent({
  legendKeys,
  className,
}: Readonly<{
  legendKeys: ChartLegendKey[];
  className: string;
}>): JSX.Element {
  return (
    <Card className={`${className} nhsuk-u-padding-3 nhsuk-chart-legend-card`}>
      {legendKeys.map((legendKey) => (
        <ChartLegendKeyComponent key={legendKey.text} {...legendKey} />
      ))}
    </Card>
  );
}

/**
 * A function to render the chart legend without borders
 *
 * @param { ChartLegendKey[]} legendKey - The legend key item to be rendered
 * @param {string} className - The classname for the component
 */
function ChartLegendBorderlessComponent({
  legendKeys,
  className,
}: Readonly<{
  legendKeys: ChartLegendKey[];
  className: string;
}>): JSX.Element {
  return (
    <div className={className}>
      {legendKeys.map((legendKey) => (
        <ChartLegendKeyComponent key={legendKey.text} {...legendKey} />
      ))}
    </div>
  );
}

/**
 * The properties for @ChartLegend component
 *
 * @param {ChartLegendKey[]} legendKeys -  The list of legend keys
 * @param {boolean} borderWrapper -  Optional: A boolean value to enable or disable a border around the legend items with a set max width of 250px
 */
export type ChartLegendProps = {
  legendKeys: ChartLegendKey[];
  borderWrapper?: boolean;
};

/**
 * A component to display a legend associated with a chart, consisting of a card which wraps a set of legend keys.
 *
 * @typedef {object} ChartLegendProps
 * @property {ChartLegendKey[]} legendKeys -  The list of legend keys
 * @property {boolean} borderWrapper - Optional: A boolean value to enable or disable a border around the legend items with a set max width of 250px
 *
 * @param {ChartLegendProps} props
 * @returns {JSX.Element}
 */
export function ChartLegend({
  legendKeys,
  borderWrapper = true,
}: Readonly<ChartLegendProps>): JSX.Element {
  const className =
    'nhsuk-u-margin-top-6 nhsuk-u-margin-bottom-3 nhsuk-u-secondary-text-colour nhsuk-body-s';

  return (
    <div aria-hidden="true">
      {borderWrapper ? (
        <ChartLegendBorderedComponent
          legendKeys={legendKeys}
          className={className}
        />
      ) : (
        <ChartLegendBorderlessComponent
          legendKeys={legendKeys}
          className={className}
        />
      )}
    </div>
  );
}
