(async () => {
  console.log("start benchmark");
  console.log(BENCHMARK_CONFIG);

  const { createSpectrumDataGenerator } = xydata;
  const promiseTestData1 = createSpectrumDataGenerator()
    .setSampleSize(BENCHMARK_CONFIG.columns)
    .setNumberOfSamples(BENCHMARK_CONFIG.rows)
    .generate()
    .toPromise();

  const promiseBenchmarkImplementation = new Promise((resolve, reject) => {
    const benchScriptName = `./bench_${BENCHMARK_CONFIG.library}.js`;
    const benchScript = document.createElement("script");
    benchScript.onload = resolve;
    benchScript.src = benchScriptName;
    document.body.append(benchScript);
  });

  const [testData1] = await Promise.all([
    promiseTestData1,
    promiseBenchmarkImplementation,
  ]);

  console.log("benchmark ready");
  console.log(BENCHMARK_IMPLEMENTATION);
  console.log("beforeStart");
  await BENCHMARK_IMPLEMENTATION.beforeStart();

  console.log("waiting couple frames ...");
  for (let i = 0; i < 100; i += 1) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  requestAnimationFrame(async () => {
    console.log("loadChart");
    const tStart = window.performance.now();
    await BENCHMARK_IMPLEMENTATION.loadChart(testData1);
    const tLoadup = window.performance.now() - tStart;
    console.log(`\t${tLoadup.toFixed(1)}ms`);
  });
})();
