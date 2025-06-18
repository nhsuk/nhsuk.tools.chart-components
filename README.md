# NHS.UK Tools Chart components

This repository contains the code for NHS.UK Chart components

These chart components are designed for visualizing Body Mass Index (BMI), Child Body Mass Index (CBMI) and Blood Pressure (BP) data.

Initially, these charts were integrated into separate codebases for each of the individual tools. To support consistency and reusability across NHS projects, we have migrated these chart components into a dedicated library.

## Components

### Bar Slider

The `Bar Slider` chart is a generic chart component that can be used to visualize a variety of data. It is part of the NHS.UK Chart component library and can be customized to fit specific needs.

```jsx
<BarSliderChart
  config={mockBarSliderConfigExample2}
  value={35.7}
  markerText="Your Result:"
/>
```

### Body Mass Index

The Body Mass Index (BMI) chart component can be used to visualise body mass index data.

```jsx
<BmiChart classificationBounds={classificationBounds} bmi={19.4} />
```

### Child Body Mass Index

The Child Body Mass Index (CBMI) chart component can be used to visualise the centile score.

```jsx
<ChildBmiChart
  classificationBounds={classificationBounds}
  centile={{ value: 1, label: 'Below 2' }}
  markerText="The centile:"
/>
```

### Blood Pressure

The Blood Pressure (BP) chart component can be used to visualise systolic and diastolic blood pressure readings.

```jsx
<BpChart
  bounds={bounds}
  reading={{ systolic: 120, diastolic: 80 }}
  graphLayout={graphLayoutProp}
/>
```

A `storybook` instance for the components can be found in `https://red-water-0aa7dfb03.6.azurestaticapps.net/?path=/docs/welcome--docs`

## Installation

Ensure you have Node.js 20.x.x. installed. Usage of NVM is recommended, to allow for easily switching between versions on different projects.

`npm install` will install dependencies.

## Build

`npm run build` will build the project.

## Build storybook

`npm run storybook` will build and deploy the storybook locally in `http://localhost:6006/`

## Import the compiled CSS

Before using the components, import the compiled CSS file from your project's build directory:

`@import 'node_modules/nhsuk-tools-chart-components-react/dist/esm/bundle.css';`
