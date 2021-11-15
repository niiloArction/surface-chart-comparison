const BENCHMARK_CONFIG = {
  // "lcjs" | "plotly"
  library: "lcjs",
  // "static" | "append" | "refresh"
  mode: "static",
  // Can be either columns or rows. In "append" mode, this is size of each sample.
  sampleSize: 100,
  // Can be either columns or rows. In "append" mode, this is max amount of displayed samples.
  sampleHistory: 100,
  ticksEnabled: false,
  yAxisInterval: [0, 1.2],
  // In "append" mode, amount of samples pushed every second.
  appendNewSamplesPerSecond: 10,
  // In "refresh" mode, amount of refreshes every second.
  refreshRate: 10,
};
