import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface GraphProps {
  historyData: any;
  days?: number;
}

export default function BaseChart({ historyData, days = 7, customData, customLabels }: any) {
  let data: { value: number }[] = [];
  let xLabels: string[] = [];
  let percentageChanges: { date: string; change: number }[] = []; // To store percentage changes

  if (customData && customLabels) {
    data = customData;
    xLabels = customLabels;
  } else if (
    historyData &&
    historyData["Time Series (Daily)"] &&
    typeof historyData["Time Series (Daily)"] === "object"
  ) {
    const daily = historyData["Time Series (Daily)"];
    const dates = Object.keys(daily).sort().reverse(); // From most recent

    data = dates
      .slice(0, days)
      .map(date => ({
        value: Number(daily[date]["4. close"])
      }))
      .reverse();

    xLabels = dates
      .slice(0, days)
      .map(date => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}`; // Format dd/mm
      })
      .reverse();

    // Calculate percentage changes
    percentageChanges = dates
      .slice(0, days)
      .map(date => {
        const openPrice = Number(daily[date]["1. open"]);
        const closePrice = Number(daily[date]["4. close"]);
        const change = ((closePrice - openPrice) / openPrice) * 100;
        return {
          date: `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`,
          change: parseFloat(change.toFixed(2))
        };
      })
      .reverse();
  }

  // Fallback if API call fails due to too many calls
  if (!data.length) {
    data = [
      { value: 100 },
      { value: 102 },
      { value: 101 },
      { value: 105 },
      { value: 104 },
      { value: 107 },
      { value: 110 }
    ];
    xLabels = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];
    // For fallback, you might want to add placeholder percentage changes or handle this case
    percentageChanges = [
      { date: 'lun', change: 2.00 },
      { date: 'mar', change: -0.98 },
      { date: 'mer', change: 3.96 },
      { date: 'gio', change: -0.95 },
      { date: 'ven', change: 2.88 },
      { date: 'sab', change: 2.80 },
      { date: 'dom', change: 0.00 } // Example, adjust as needed
    ];
  }

  // You can log percentageChanges here to see the calculated values
  console.log("Percentage Changes:", percentageChanges);

  const allValues = data.map(item => item.value);
  const dynamicMaxValue = allValues.length > 0 ? Math.max(...allValues) * 1.1 : 100; // Aggiungi un 10% per un po' di margine sopra il valore più alto
  // Se non ci sono dati, imposta un valore predefinito sensato, es. 100.
  return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <LineChart
        data={data}
        xAxisLabelTexts={xLabels}
        maxValue={dynamicMaxValue}
        animateOnDataChange
        yAxisOffset={40}
        showValuesAsDataPointsText
        textShiftY={-8}
        textShiftX={-10}
        textFontSize={13}
        hideRules
        showVerticalLines
      />
    </View>
  );
}