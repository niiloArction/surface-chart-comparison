const BENCHMARK_CONFIG = {
  // "lcjs" | "plotly" | "scichart" | "echart"
  library: "lcjs",
  // "static" | "append" | "refresh"
  mode: "append",
  // Only affects "static" and "refresh" modes!
  columns: 1000,
  // Only affects "static" and "refresh" modes!
  rows: 1000,
  // In "refresh" mode, amount of refreshes every second.
  refreshRate: 60,
  ticksEnabled: true,
  yAxisInterval: [0, 1.2],
  // In "append" mode, the size of each sample as well as one size of surface grid.
  appendSampleSize: 300,
  // In "append" mode, amount of samples pushed every second.
  appendNewSamplesPerSecond: 100,
  // In "append" mode, interval of x axis as seconds as well as one size of surface grid.
  appendTimeDomainIntervalSeconds: 10,
  // In "append" mode, the data that matches this many seconds is first appended into the chart to simulate as if the application had run for a long time.
  appendHistorySeconds: 0,
  maxChunkDataPoints: 978694,
};
