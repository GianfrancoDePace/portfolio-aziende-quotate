import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface GraphProps {
  historyData: any;
  days?: number;
}

export default function GraphedData({ historyData, days = 7 }: GraphProps) {
  let data: { value: number }[] = [];
  let xLabels: string[] = [];

  if (
    historyData &&
    historyData["Time Series (Daily)"] &&
    typeof historyData["Time Series (Daily)"] === "object"
  ) {
    const daily = historyData["Time Series (Daily)"];
    const dates = Object.keys(daily).sort().reverse(); // dal più recente
    data = dates
      .slice(0, days)
      .map(date => ({
        value: Number(daily[date]["4. close"])
      }))
      .reverse(); // dal più vecchio al più recente
    xLabels = dates
      .slice(0, days)
      .map(date => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}`; // formato gg/mm
      })
      .reverse();
  }

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
  }

  return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <LineChart
        data={data}
        xAxisLabelTexts={xLabels}
        animateOnDataChange
        yAxisOffset={90}
        showValuesAsDataPointsText
        textShiftY={-8}
        textShiftX={-10}
        textFontSize={13}
        hideRules
        showVerticalLines
        verticalLinesColor='rgb(14,164,164,0.2'
      />
    </View>
  );
}