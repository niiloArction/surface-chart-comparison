const BENCHMARK_CONFIG = {
  library: "lcjs",
  // "static" | "append" | "refresh"
  mode: "refresh",
  sampleSize: 1000,
  sampleHistory: 1000,
  ticksEnabled: false,
  yAxisInterval: [0, 1.2],
  appendNewSamplesPerSecond: 10,
  refreshRate: 10,
};
