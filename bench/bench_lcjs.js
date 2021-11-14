const BENCHMARK_IMPLEMENTATION = (() => {
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
      const { lightningChart, emptyFill, AxisTickStrategies } = lcjs;

      const chart = lightningChart()
        .Chart3D({
          container: document.getElementById("chart"),
        })
        .setTitleFillStyle(emptyFill);

      const axes = [
        chart.getDefaultAxisX(),
        chart.getDefaultAxisY(),
        chart.getDefaultAxisZ(),
      ];
      // NOTE: Load speed can be further increased by initially loading chart without text (axis ticks).
      //   axes.forEach((axis) => axis.setTickStrategy(AxisTickStrategies.Empty));

      const surface = chart
        .addSurfaceGridSeries({
          columns: BENCHMARK_CONFIG.columns,
          rows: BENCHMARK_CONFIG.rows,
        })
        .invalidateHeightMap(initialData);

      requestAnimationFrame(() => {
        resolve();
        // axes.forEach((axis) =>
        //   axis.setTickStrategy(AxisTickStrategies.Numeric)
        // );
      });
    });
  };

  return {
    beforeStart,
    loadChart,
  };
})();
