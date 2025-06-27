import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface BaseLineChartProps {
  data: { value: number }[];
  xLabels: string[];
  maxValue?: number;
  showPointValues?: boolean; // Controllo per i valori sui punti
  showYAxisLabels?: boolean; // Nuova prop: controllo per le etichette dell'asse Y
  yAxisInterval?: number; // Nuova prop: intervallo per le etichette dell'asse Y
}

export default function BaseLineChart({
  data,
  xLabels,
  maxValue,
  showPointValues = true,
  showYAxisLabels = true, // Default a true
  yAxisInterval // Default calcolato internamente
}: BaseLineChartProps) {
  const dataToRender = data && data.length > 0 ? data : [{ value: 0 }];
  const labelsToRender = xLabels && xLabels.length > 0 ? xLabels : ['N/A'];

  const allValues = dataToRender.map(d => d.value);
  const dataMax = allValues.length > 0 ? Math.max(...allValues) : 0;
  const dataMin = allValues.length > 0 ? Math.min(...allValues) : 0;

  let finalMaxValue = maxValue !== undefined ? maxValue : (dataMax * 1.1);
  let finalMinValue = dataMin * 0.9;

  // Handling edge cases for scale:
  if (dataToRender.length === 1 && dataToRender[0].value === 0) {
    finalMaxValue = 10; // More appropriate default for charts that can have zero
    finalMinValue = -10; // Ensure symmetry around zero for percentage charts if all zero
  } else if (dataToRender.every(item => item.value === 0)) { // All data points are zero
    finalMaxValue = 5;
    finalMinValue = -5;
  } else {
    // For percentage charts, ensure symmetry around zero based on absolute max value
    const absMaxVal = Math.max(Math.abs(dataMax), Math.abs(dataMin));
    if (absMaxVal > 0 && Math.abs(finalMaxValue / absMaxVal - 1) > 0.1 && Math.abs(finalMinValue / absMaxVal - (-1)) > 0.1) { // If not already symmetric
        finalMaxValue = absMaxVal * 1.2;
        finalMinValue = -absMaxVal * 1.2;
    }

    // Ensure there's a visible range if max and min are very close
    if (finalMaxValue - finalMinValue < 1) {
        const avg = (finalMaxValue + finalMinValue) / 2;
        finalMaxValue = avg + 0.5;
        finalMinValue = avg - 0.5;
    }
  }


  // Calculate yAxis labels more intelligently
  const calculateYAxisLabels = (min: number, max: number, interval?: number) => {
    if (!showYAxisLabels) return [];
    
    // Se non specificato, calcola un intervallo predefinito
    const currentInterval = interval || (max - min) / 5; // 5 sezioni di default
    if (currentInterval <= 0) return [`${min.toFixed(1)}`]; // Evita divisione per zero

    const labels = [];
    // Partiamo da un multiplo dell'intervallo <= minVal
    let currentLabel = Math.floor(min / currentInterval) * currentInterval;

    while (currentLabel <= max + currentInterval * 0.5) { // Aggiungi un piccolo margine
      labels.push(currentLabel.toFixed(1));
      currentLabel += currentInterval;
    }
    return labels;
  };


  return (
    <View style={{ height: 300, paddingTop: 25, marginBottom: 40 }}>
      <LineChart
        data={dataToRender}
        xAxisLabelTexts={labelsToRender}
        maxValue={finalMaxValue}
        animateOnDataChange
        showValuesAsDataPointsText={showPointValues}
        textShiftY={-8}
        textShiftX={-10}
        textFontSize={13}
        hideRules
        showVerticalLines
      />
    </View>
  );
}