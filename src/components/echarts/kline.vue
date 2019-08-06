<template>
  <div id="myChart" style="width:100%;height:500px;"></div>
</template>
<script>
import echarts from "echarts"; // 百度图表
export default {
  name: "kline",
  props: ["data"],
  data() {
    return {
      rawData: [],
      myChart: null,
      option: {
        upColor: "#00da3c",
        downColor: "#ec0000"
      }
    };
  },
  watch: {
    data(newval) {
      let arrayData = [];
      var that = this;
      arrayData.push(newval.datetime.split(" ")[0]);
      arrayData.push(newval.open);
      arrayData.push(newval.close);
      arrayData.push(newval.lowest);
      arrayData.push(newval.highest);
      arrayData.push(168890000);
      that.rawData.push(arrayData);
      var data = that.splitData(JSON.parse(JSON.stringify(that.rawData)));
      console.log(data)
      that.drawKline({
        animation: false,
        legend: {
          bottom: 10,
          left: "center",
          data: ["Dow-Jones index", "MA5", "MA10", "MA20", "MA30"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          borderWidth: 1,
          borderColor: "#fff",
          padding: 10,
          textStyle: {
            color: "#fff"
          },
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          }
          // extraCssText: 'width: 170px'
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#999"
          }
        },
        visualMap: {
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [
            {
              value: 1,
              color: that.option.downColor
            },
            {
              value: -1,
              color: that.option.upColor
            }
          ]
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "50%"
          },
          {
            left: "10%",
            right: "8%",
            top: "63%",
            height: "16%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              z: 100
            },
          textStyle: {
            color: "#fff"
          },
          },
          {
            type: "category",
            gridIndex: 1,
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
          textStyle: {
            color: "#fff"
          },
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: "slider",
            top: "85%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "Dow-Jones index",
            type: "candlestick",
            data: data.values,
            itemStyle: {
              normal: {
                color: that.option.upColor,
                color0: that.option.downColor,
                borderColor: null,
                borderColor0: null
              }
            },
            tooltip: {
              formatter: function(param) {
                param = param[0];
                return [
                  "Date: " + param.name + '<hr size=1 style="margin: 3px 0">',
                  "Open: " + param.data[0] + "<br/>",
                  "Close: " + param.data[1] + "<br/>",
                  "Lowest: " + param.data[2] + "<br/>",
                  "Highest: " + param.data[3] + "<br/>"
                ].join("");
              }
            }
          },
          {
            name: "MA5",
            type: "line",
            data: this.calculateMA(5, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA10",
            type: "line",
            data: this.calculateMA(10, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA20",
            type: "line",
            data: this.calculateMA(20, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA30",
            type: "line",
            data: this.calculateMA(30, data),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "Volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumes
          }
        ]
      });
    }
  },
  computed: {
    progress() {
      return 10;
    }
  },
  methods: {
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      
        console.log(rawData)
      for (var i = 0; i < rawData.length; i++) {
        var temp = rawData[i]
        categoryData.push(temp.splice(0, 1)[0]);
        values.push(temp);
        volumes.push([
          i,
          temp[4],
          temp[0] > temp[1] ? 1 : -1
        ]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    },
    drawKline(data) {
      var that = this;
      that.myChart.setOption(data, true);
      that.myChart.dispatchAction({
        type: "brush",
        areas: [
          {
            brushType: "lineX",
            coordRange: ["2016-06-02", "2019-10-20"],
            xAxisIndex: 0
          }
        ]
      });
    }
  },
  mounted() {
    let that = this;
    that.myChart = echarts.init(document.getElementById("myChart"));
    // that.drawKline(that.option);
  }
};
</script>
<style lang="less">
.van-progress__portion {
  border-radius: 10px 0 0 10px;
}
</style>

<style lang="less" scoped>
.box1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  dl {
    text-align: center;
    dt {
      font-size: 13px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    dd {
      font-size: 21px;
      font-family: Bahnschrift-Regular;
      font-weight: 400;
      color: rgba(14, 189, 255, 1);
      line-height: 24px;
    }
  }
  .btn {
    flex-shrink: 0;
    width: 90px;
    height: 30px;
    line-height: 30px;
  }
}
.box2 {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 15px 0;
  h4 {
    font-size: 25px;
    color: rgba(0, 204, 0, 1);
    line-height: 24px;
  }
  small {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 204, 0, 1);
    line-height: 17px;
  }
  .selectMode {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
  }
}
.business {
  padding: 5px 15px;
  .text {
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 5px;
    font-size: 13px;
    color: rgba(141, 154, 183, 1);
    line-height: 25px;
    .mai {
      color: #ff2737;
    }
    .maii {
      color: #00cc00;
    }
  }
}
</style>
