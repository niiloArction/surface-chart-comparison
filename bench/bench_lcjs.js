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
      const { lightningChart, Themes, emptyFill, ColorHSV, AxisTickStrategies, AxisScrollStrategies, ColorShadingStyles, emptyLine, PalettedFill, LUT, ColorRGBA } = lcjs;

      chart = lightningChart().Chart3D({
        theme: Themes.auroraBorealisNew,
        container: document.getElementById("chart"),
      })
        .setTitle('')

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
      
      chart.setBoundingBoxStrokeStyle(emptyLine)

      chart.setBoundingBoxStrokeStyle(emptyLine).setSeriesBackgroundFillStyle(emptyFill)
      ;[chart.getDefaultAxisX(),chart.getDefaultAxisY(),chart.getDefaultAxisZ()].forEach((axis) => axis.setTickStrategy(AxisTickStrategies.Empty).setStrokeStyle(emptyLine))


      surface
        .setFillStyle(new PalettedFill({
          lookUpProperty: 'y',
          lut: new LUT({
            steps: [
              {
                value: 0,
                color: ColorHSV(0, 1, 0),
              },
              {
                value: (1 / 6),
                color: ColorHSV(270, 0.84, 0.2),
              },
              {
                value: (2 / 6),
                color: ColorHSV(289, 0.86, 0.35),
              },
              {
                value: (3 / 6),
                color: ColorHSV(324, 0.97, 0.56),
              },
              {
                value: (4 / 6),
                color: ColorHSV(1, 1, 1),
              },
              {
                value: (5 / 6),
                color: ColorHSV(44, 0.64, 1),
              },
              {
                value: 1,
                color: ColorHSV(62, 0.32, 1),
              },
            ],
            units: "dB",
            interpolate: true,
          }),
        }))
        .setColorShadingStyle(new ColorShadingStyles.Simple()).setWireframeStyle(emptyLine)

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
