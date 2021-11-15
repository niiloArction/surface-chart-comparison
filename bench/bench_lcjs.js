const BENCHMARK_IMPLEMENTATION = (() => {
  let chart, axes, surface;

  const beforeStart = () => {
    return new Promise((resolve, reject) => {
      const libScript = document.createElement("script");
      libScript.onload = () => resolve();
      libScript.src = "lib/lcjs.iife.js";
      document.body.append(libScript);
    });
  };

  const loadChart = (initialData) => {
    return new Promise((resolve, reject) => {
      const { lightningChart, emptyFill, AxisTickStrategies, AxisScrollStrategies } = lcjs;

      chart = lightningChart().Chart3D({
        container: document.getElementById("chart"),
      });

      chart
        .getDefaultAxisY()
        .setInterval(
          BENCHMARK_CONFIG.yAxisInterval[0],
          BENCHMARK_CONFIG.yAxisInterval[1],
          false,
          true
        );

      axes = [
        chart.getDefaultAxisX(),
        chart.getDefaultAxisY(),
        chart.getDefaultAxisZ(),
      ];

      if (!BENCHMARK_CONFIG.ticksEnabled) {
        chart.setTitleFillStyle(emptyFill);
        axes.forEach((axis) => axis.setTickStrategy(AxisTickStrategies.Empty));
      }

      if (BENCHMARK_CONFIG.mode !== "append") {
        surface = chart
          .addSurfaceGridSeries({
            columns: BENCHMARK_CONFIG.sampleSize,
            rows: BENCHMARK_CONFIG.sampleHistory,
            dataOrder: 'rows',
          })
          .invalidateHeightMap(initialData);
      } else {
        surface = chart.addSurfaceScrollingGridSeries({
          columns: BENCHMARK_CONFIG.sampleSize,
          rows: BENCHMARK_CONFIG.sampleHistory,
          scrollDimension: "rows",
        });
        chart.getDefaultAxisZ().setScrollStrategy(AxisScrollStrategies.progressive).setInterval(0, -BENCHMARK_CONFIG.sampleHistory)
      }

      requestAnimationFrame(resolve);
    });
  };

  const appendData = (data) => {
    surface.addValues({
      yValues: data,
    });
  };

  const refreshData = (data) => {
    surface.invalidateHeightMap(data)
  }

  return {
    beforeStart,
    loadChart,
    appendData,
    refreshData,
  };
})();
