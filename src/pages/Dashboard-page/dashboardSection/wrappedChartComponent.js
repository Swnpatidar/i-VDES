import WithChartWrapper from "../../../components/common/HOC/withChartwrapper";
import AccuracyLineChart from "../../../components/snippets/Graphs/accuracy-line-chart";
import DonutChart from "../../../components/snippets/Graphs/donut-chart";
import LineCharts from "../../../components/snippets/Graphs/line-chart";
import StylishLineChart from "../../../components/snippets/Graphs/stylish-line-chart";
import TimelineChart from "../../../components/snippets/Graphs/timeline-line-chart";
import ImageClassification from "./image-classification";

export const WrappedAccuracyLineChart=WithChartWrapper(AccuracyLineChart,"Modal Accuracy Chart")
export const WrappedDountChart=WithChartWrapper(DonutChart,"Data Statistics")
export const WrappedTimelineChart=WithChartWrapper(TimelineChart,"Encryption Uses Timeline")
export const WrappedLineChart=WithChartWrapper(ImageClassification,"Image Classification")
export const WrappedStylishlineChart=WithChartWrapper(StylishLineChart,"Monthly Encryption & Decryption")


