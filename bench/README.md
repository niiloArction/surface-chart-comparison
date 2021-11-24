
Start benchmark app with

```
npm i
npm start
```

Modify active benchmark by directly editing `config.js` file.

### SciChart JS

SciChart JS requires extra effort compared to other chart libraries - **locally installed licensing Wizard, active license and TypeScript project setup**. The test application can be found in `bench/scichart`. In order to run it, you have to build it:
```
npm i
npm run build
```
Afterwards, as long as `scichart` is selected in test `config.js` file, SciChart application will be tested.

## Reading benchmark measurements

- `"fail"` | If application doesn't display at all or displays incorrectly or performs with absolutely terribly `true`, otherwise `false`.
- `"initialRenderMs"` | Read from console.
- `"cpu"` | Read CPU usage as % from browser (Chrome) developer tools.
- `"fps"` | Read from console. Should be calculated average from period of at least 10 seconds.
