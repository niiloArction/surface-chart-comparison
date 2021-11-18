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
      const { lightningChart, emptyFill, AxisTickStrategies, AxisScrollStrategies, ColorShadingStyles, emptyLine } = lcjs;

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
        console.log(`surface ${BENCHMARK_CONFIG.columns}x${BENCHMARK_CONFIG.rows}`)
        surface = chart
          .addSurfaceGridSeries({
            columns: BENCHMARK_CONFIG.columns,
            rows: BENCHMARK_CONFIG.rows,
            dataOrder: 'rows',
          })
          .invalidateHeightMap(initialData);
      } else {
        const surfaceRows = Math.ceil(BENCHMARK_CONFIG.appendNewSamplesPerSecond * BENCHMARK_CONFIG.appendTimeDomainIntervalSeconds)
        console.log(`surface ${BENCHMARK_CONFIG.appendSampleSize}x${surfaceRows}`)
        surface = chart.addSurfaceScrollingGridSeries({
          columns: BENCHMARK_CONFIG.appendSampleSize,
          rows: surfaceRows,
          scrollDimension: "rows",
        })
        .addValues({
          yValues: initialData
        })
        chart.getDefaultAxisZ().setScrollStrategy(AxisScrollStrategies.progressive).setInterval(0, -surfaceRows)
      }

      surface.setColorShadingStyle(new ColorShadingStyles.Simple()).setWireframeStyle(emptyLine)

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
