
## Static performance comparison breakdown

We have a selected a single test from the set of static performance tests that were run for each included chart library. This test is the same for each library and it highlights the performance differences most effectively.

Here are the results of static surface grid chart test with 2000x2000 data points.

| JavaScript Chart Library | Loading speed (milliseconds) |
|:---|:---|
| LightningChart JS | 152 |
| Hardware accelerated competitor A | 1302 |
| Competitor B with no hardware acceleration | 14598 |

![](./bench/analysis/visualization-static-2000x2000.PNG)

## Refreshing performance comparison breakdown

We have a selected a single test from the set of refreshing performance tests that were run for each included chart library. This test is the same for each library and it highlights the performance differences most effectively.

Here are the results of refreshing (refresh rate = 10 Hz) surface grid chart test with 2000x2000 data points.

| JavaScript Chart Library | Actual refresh rate /s | CPU Usage (%) |
|:---|:---|:---|
| LightningChart JS | 10.0 | 15.5 |
| Hardware accelerated competitor A | 2.2 | 100.0 |
| Competitor B with no hardware acceleration | FAIL | FAIL |

Below is a bar chart visualization of this same results table.

![](./bench/analysis/visualization-refresh-2000x2000.PNG)

To help understand viewers to understand the effects of bad refresh rate and CPU usage measurements we have created a [YouTube video showcasing the charts](https://www.youtube.com/watch?v=Op_iu5urRk0) mentioned here undertaking the refreshing surface chart performance test (not necessarily with same parameters as the test case highlighted above). In this video you can visible see how a low FPS looks on a web page, and respectively how a good FPS looks.

## Appending performance comparison breakdown

We have a selected a single test from the set of appending performance tests that were run for each included chart library. This test is the same for each library and it highlights the performance differences most effectively.

Here are the results of appending surface grid chart test with sample size 500, samples added per second 200 and sample history 10 seconds.

| JavaScript Chart Library | Refresh rate (FPS) | CPU Usage (%) |
|:---|:---|:---|
| LightningChart JS | 60.0 | 7.5 |
| Hardware accelerated competitor A | 5.8 | 100.0 |
| Competitor B with no hardware acceleration | 0.7 | 100.0 |

Below is a bar chart visualization of this same results table.

![](./bench/analysis/visualization-append-sample500_200hz.PNG)

To help understand viewers to understand the effects of bad refresh rate and CPU usage measurements we have created a [YouTube video showcasing the charts](https://www.youtube.com/watch?v=Vlwf6n3ptFc) mentioned here undertaking the appending surface chart performance test (not necessarily with same parameters as the test case highlighted above). In this video you can visible see how a low FPS looks on a web page, and respectively how a good FPS looks.
