import { SciChartSurface } from "scichart";
import { TWebAssemblyChart } from "scichart/Charting/Visuals/SciChartSurface";
import { CameraController } from "scichart/Charting3D/CameraController";
import { MouseWheelZoomModifier3D } from "scichart/Charting3D/ChartModifiers/MouseWheelZoomModifier3D";
import { OrbitModifier3D } from "scichart/Charting3D/ChartModifiers/OrbitModifier3D";
import { Vector3 } from "scichart/Charting3D/Vector3";
import { NumericAxis3D } from "scichart/Charting3D/Visuals/Axis/NumericAxis3D";
import { SciChart3DSurface } from "scichart/Charting3D/Visuals/SciChart3DSurface";
import {
    EDrawMeshAs,
    SurfaceMeshRenderableSeries3D
} from "scichart/Charting3D/Visuals/RenderableSeries/SurfaceMesh/SurfaceMeshRenderableSeries3D";
import { GradientColorPalette } from "scichart/Charting3D/Visuals/RenderableSeries/SurfaceMesh/GradientColorPalette";
import { UniformGridDataSeries3D } from "scichart/Charting3D/Model/DataSeries/UniformGridDataSeries3D";
import { NumberRange } from "scichart/Core/NumberRange";
import { zeroArray2D } from "scichart/utils/zeroArray2D";
import { TSciChart3D } from "scichart/types/TSciChart3D";

declare let BENCHMARK_CONFIG: {
  library: "scichart",
  mode: "static" | "append" | "refresh",
  sampleSize: number,
  sampleHistory: number,
  ticksEnabled: boolean,
  yAxisInterval: [number, number],
  appendNewSamplesPerSecond: number,
  refreshRate: number,
}

// NOTE: SciChart JS implementation doesn't work exactly correctly
// - In "append" mode, Z axis should be scrolling and ticks should move along with new data.

;(window as any).BENCHMARK_IMPLEMENTATION_SCICHART = (() => {
  
  let sciChart3DSurface: SciChart3DSurface
  let wasmContext: TSciChart3D
  let data: number[][]
  let series: SurfaceMeshRenderableSeries3D
  let dataSeries: UniformGridDataSeries3D

  const loadChart = (initialData) => {
    return new Promise<void>(async (resolve, reject) => {
      // Code based on https://demo.scichart.com/javascript-3d-surface-mesh-chart

        const RUNTIME_LICENSE_KEY = "bszJo3nCP3GpLQJTzG4EBX4icSGVJci4mI/jg1vylxEHQAvvay6tF66llQqf2Sm8jbeekkMSL8lGG1azFSiK+bu4/Sm/ss6ZvTscd+dVK+T+Hc5/0VI+pXbxX8hiYVjYzBXehepLw6+nyAreNw8rL8/9BkP2L+Cpxk+WmHC6gHbr6IwYpCMzM84l0NrcJL2aW8KRMfJbdJ7qANlsAn9VciMpgyrELYnKEWWw0TihqpaZoDyHL1xx9M4aW7wC2tjKDdB8cRoP3IEi3bqXeFbheQEpC33A4X3zY4BDmH+6YnYLWb2yRbDmT8R791YmFU/lcumIDRXIiKpB9SfYF50I/DznsJ0J4uv5ZpbIrjDu7f1NZNY9yyRT66eASGkW6dzvP9dywp6Gg/vsCj+nZcHppVoN5XlCPiFTMywF6HYXEvXa1IAwBrPkRD0JVemfssjVEazxb40Jy1cmuo/70sIPYG5FaJJHJAiawY6JbUtb4WHmVcIMHEsA6+htGPTTBHmjstSeX9c102XVzSIBdBQSMr7pZqpp885uSBSv/LGYi4ZWG9nrqnrOegz2Mgan86kQ";
        SciChart3DSurface.setRuntimeLicenseKey(RUNTIME_LICENSE_KEY);
        const sciChart = await SciChart3DSurface.create('chart');
        sciChart3DSurface = sciChart.sciChart3DSurface
        wasmContext = sciChart.wasmContext
        data = initialData

        // Create and position the camera in the 3D world
        sciChart3DSurface.camera = new CameraController(wasmContext, {
          position: new Vector3(-200, 200, -200),
          target: new Vector3(0, 50, 0)
        });
        // Set the worlddimensions, which defines the Axis cube size
        sciChart3DSurface.worldDimensions = new Vector3(200, 100, 200);

        // Add an X,Y and Z Axis
        sciChart3DSurface.xAxis = new NumericAxis3D(wasmContext, { axisTitle: "X Axis" });
        sciChart3DSurface.yAxis = new NumericAxis3D(wasmContext, {
            axisTitle: "Y Axis",
            visibleRange: new NumberRange(BENCHMARK_CONFIG.yAxisInterval[0], BENCHMARK_CONFIG.yAxisInterval[1])
        });
        sciChart3DSurface.zAxis = new NumericAxis3D(wasmContext, { axisTitle: "Z Axis" });

        if (! BENCHMARK_CONFIG.ticksEnabled) {
          sciChart3DSurface.xAxis.labelStyle.fontSize = 0
          sciChart3DSurface.yAxis.labelStyle.fontSize = 0
          sciChart3DSurface.zAxis.labelStyle.fontSize = 0
        }

        // Create a UniformGridDataSeries3D
        dataSeries = new UniformGridDataSeries3D(wasmContext, {
          yValues: initialData,
          xStep: 1,
          zStep: 1,
          dataSeriesName: "Uniform Surface Mesh"
        });

        // Create the color map
        const colorMap = new GradientColorPalette(wasmContext, {
          gradientStops: [
              { offset: 1, color: "#8B0000" },
              { offset: 0.9, color: "#FF0000" },
              { offset: 0.7, color: "#FF0000" },
              { offset: 0.5, color: "#ADFF2F" },
              { offset: 0.3, color: "#00FFFF" },
              { offset: 0.1, color: "#0000FF" },
              { offset: 0, color: "#1D2C6B" }
          ]
        });

        // Finally, create a SurfaceMeshRenderableSeries3D and add to the chart
        series = new SurfaceMeshRenderableSeries3D(wasmContext, {
            dataSeries,
            meshColorPalette: colorMap,
        });
        sciChart3DSurface.renderableSeries.add(series);

        // Optional: Add some interactivity modifiers
        sciChart3DSurface.chartModifiers.add(new MouseWheelZoomModifier3D());
        sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());
        
        sciChart3DSurface.onSciChartRendered = () => {
          resolve()
        }
    });
  };

  const appendData = (newData) => {
    for (let i = 0; i < newData.length; i += 1) {
      data.push(newData[i]);
    }
    while (data.length > BENCHMARK_CONFIG.sampleHistory) {
      data.shift();
    }
    dataSeries.setYValues(data)

    // NOTE: For some reason, chart is not refreshed after calling setYValues. I haven't found any reference how this refresh should be properly triggered so just using random axis titles as a hotfix.
    sciChart3DSurface.xAxis.axisTitle = Math.random().toFixed(2)
  };

  const refreshData = (data) => {
    dataSeries.setYValues(data)

    // NOTE: For some reason, chart is not refreshed after calling setYValues. I haven't found any reference how this refresh should be properly triggered so just using random axis titles as a hotfix.
    sciChart3DSurface.xAxis.axisTitle = Math.random().toFixed(2)
  }

  return {
    loadChart,
    appendData,
    refreshData,
  };
})();
