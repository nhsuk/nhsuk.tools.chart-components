import { BarSliderChartModel } from '@models/bar-slider-chart.model';
import React, { JSX } from 'react';

type BarSliderGraphAxisMarkerProps = {
  chartName: string;
  markerText: string;
  offsetPercent: number;
};

type BarSliderGraphAxisProps = {
  model: BarSliderChartModel;
};

const markerAxisLabelClassname = (
  name: string,
  offsetPercent: number
): string =>
  offsetPercent > 0
    ? `${name}-axis-marker-label`
    : `${name}-start-axis-marker-label`;

const markerAxisClassname = (name: string, offsetPercent: number): string =>
  offsetPercent > 0 ? `${name}-axis-marker` : `${name}-start-axis-marker`;

function AxisMarker({
  chartName,
  markerText,
  offsetPercent,
}: Readonly<BarSliderGraphAxisMarkerProps>): JSX.Element {
  return (
    <div
      className={`${markerAxisClassname(chartName, offsetPercent)}`}
      style={{ left: `${offsetPercent}%` }}>
      <div
        className={`nhsuk-font-size-16 nhsuk-u-secondary-text-colour ${markerAxisLabelClassname(
          chartName,
          offsetPercent
        )}`}>
        {markerText}
      </div>
    </div>
  );
}

export function BarSliderChartAxis({
  model,
}: Readonly<BarSliderGraphAxisProps>): JSX.Element {
  return (
    <>
      {model
        .getAxisTicks()
        .map(
          ({ label, value, isVisible }) =>
            isVisible && (
              <AxisMarker
                chartName={model.name}
                markerText={label}
                offsetPercent={value}
                key={label}
              />
            )
        )}
    </>
  );
}
