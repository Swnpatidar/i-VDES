import React from "react";
import LineCharts from "../../../components/snippets/Graphs/line-chart";
import {
  HIGH_IMAGE,
  LOW_IMAGE,
  MEDIUM_IMAGE,
  NONE_IMAGE,
} from "../../../utils/app-image-constant";

const ImageClassification = () => {
  return (
    <>
      <LineCharts
        graphColor="rgba(240, 18, 35, 0.5)"
        graphSensivityName="High"
        icon={HIGH_IMAGE}
      />
      <LineCharts
        graphColor="rgba(0, 102, 255, 0.5)"
        graphSensivityName="Medium"
        icon={MEDIUM_IMAGE}
      />
      <LineCharts
        graphColor="rgba(0, 168, 22, 0.5)"
        graphSensivityName="Low"
        icon={LOW_IMAGE}
      />
      <LineCharts
        graphColor="rgba(172, 177, 211, 0.5)"
        graphSensivityName="None"
        icon={NONE_IMAGE}
      />
    </>
  );
};

export default ImageClassification;
