## glyph-inspect

A utility to inspect glyph PBFs.

## Usage

```
npm install && npm link

// pretty-printed JSON metadata
inspect ./0-255.pbf

// raw JSON
inspect ./0-255.pbf --raw

// HTML page
inspect ./0-255.pbf --html > 0-255.html
open 0-255.html
```

Outputs pretty-printed (with bitmap buffers hidden) file metadata.

#### Options

```
--raw: outputs full JSON-stringified data
--html: outputs HTML string to view in a browser, with simple (not beautiful) rendered SDFs + metadata
```
