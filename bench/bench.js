(async () => {
  console.log("start benchmark");
  console.log(BENCHMARK_CONFIG);

  const { createSpectrumDataGenerator } = xydata;
  const surfaceAppendRowsCount = Math.ceil(BENCHMARK_CONFIG.appendNewSamplesPerSecond * BENCHMARK_CONFIG.appendTimeDomainIntervalSeconds)
  const promiseTestData1 = createSpectrumDataGenerator()
    .setSampleSize(BENCHMARK_CONFIG.mode === 'append' ? BENCHMARK_CONFIG.appendSampleSize : BENCHMARK_CONFIG.columns)
    .setNumberOfSamples(BENCHMARK_CONFIG.mode === 'append' ? surfaceAppendRowsCount : BENCHMARK_CONFIG.rows)
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
  for (let i = 0; i < 50; i += 1) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  requestAnimationFrame(async () => {
    console.log("loadChart");
    const tStart = window.performance.now();
    await BENCHMARK_IMPLEMENTATION.loadChart(testData1);
    const tLoadup = window.performance.now() - tStart;
    console.log(`\t${tLoadup.toFixed(1)}ms`);

    // Setup FPS monitoring.
    setTimeout(() => {
      console.log(`FPS monitoring start`)
      let fpsMonitoringStart = Date.now();
      let frames = 0;
      let fps;
      const recordFrame = () => {
        frames++;
        const tNow = Date.now();
        fps = 1000 / ((tNow - fpsMonitoringStart) / frames);
        requestAnimationFrame(recordFrame);
      };
      requestAnimationFrame(recordFrame);
      setInterval(() => console.log(`FPS: ${fps.toFixed(1)}`), 1000);
    }, 2500);

    if (BENCHMARK_CONFIG.mode === "append") {
      let iSample = surfaceAppendRowsCount - 1;
      let tPrev = window.performance.now();
      let newDataModulus = 0;
      const onEveryFrame = () => {
        const tNow = window.performance.now();
        const tDelta = tNow - tPrev;
        let newSamplesCountFloat =
          BENCHMARK_CONFIG.appendNewSamplesPerSecond * (tDelta / 1000) +
          newDataModulus;
        const newSamplesCount = Math.floor(newSamplesCountFloat);

        if (newSamplesCount > 0) {
          const newSamples = [];
          for (let i = 0; i < newSamplesCount; i += 1) {
            newSamples.push(testData1[(iSample + i) % testData1.length]);
          }
          BENCHMARK_IMPLEMENTATION.appendData(newSamples);
          tPrev = tNow;
          iSample += newSamplesCount;
          newDataModulus = newSamplesCountFloat % 1;
        }

        requestAnimationFrame(onEveryFrame);
      };
      onEveryFrame();
    }

    if (BENCHMARK_CONFIG.mode === "refresh") {

      const testData2 = await createSpectrumDataGenerator()
        .setSampleSize(BENCHMARK_CONFIG.columns)
        .setNumberOfSamples(BENCHMARK_CONFIG.rows)
        .generate()
        .toPromise();

      let tPrev = window.performance.now()
      let iDataSet = 0
      const onEveryFrame = () => {
        const tNow = window.performance.now()
        const tDelta = tNow - tPrev
        if (tDelta >= 1000 / BENCHMARK_CONFIG.refreshRate) {
          iDataSet = (iDataSet + 1) % 2
          const dataSet = iDataSet === 0 ? testData1 : testData2
          BENCHMARK_IMPLEMENTATION.refreshData(dataSet)
          tPrev = tNow
        }
        requestAnimationFrame(onEveryFrame)
      }
      onEveryFrame()
    }
  });
})();
