## Documentation
You can see below the API reference of this module.

### `bundle(path, globalName)`
Bundles the dependencies of the provided file.

#### Params
- **String** `path`: The path to the javascript file you want to bundle.
- **String** `globalName`: If provided, when the bundle is not used in a commonjs environment the global variable will be created.

#### Return
- **String** The raw bundled js code.

