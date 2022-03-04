import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ type, xCategories, titleText, series, graphType, yAxisText }) => {
  const options = {
    chart: {
      type: type,
    },
    credits: {
      enabled: false,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    tooltip: {
      formatter: function () {
        if (graphType === "contributors") {
          return (
            "<b>Changes:" +
            this.y +
            "</b><br><b>Contributor:" +
            this.series.name +
            "</b>"
          );
        } else {
          return "<br><b>Changes:" + this.y+"</b>";
        }
      },
    },
    xAxis: {
      categories: xCategories,
    },
    yAxis: {
      title: {
          text: yAxisText
      }
  },
    title: {
      text: titleText,
    },
    series: series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
