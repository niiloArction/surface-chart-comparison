const BENCHMARK_IMPLEMENTATION = (() => {
  const beforeStart = () => {
    return new Promise((resolve, reject) => {
      const libScript = document.createElement("script");
      libScript.onload = () => resolve();
      libScript.src = "lib/plotly-2.4.2.min.js";
      document.body.append(libScript);
    });
  };

  const loadChart = (initialData) => {
    return new Promise((resolve, reject) => {
      const plotData = [
        {
          z: initialData,
          type: "surface",
        },
      ];

      const layout = {
        autosize: true,
      };
      Plotly.newPlot("chart", plotData, layout);

      requestAnimationFrame(resolve);
    });
  };

  return {
    beforeStart,
    loadChart,
  };
})();
