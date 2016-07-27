#!/usr/bin/env node

var fs = require('fs');
var prettyjson = require('prettyjson');
var Pbf = require('pbf');
var Glyphs = require('./glyphs.js').glyphs;

function getGlyphs(path, cb) {
    fs.readFile(path, (err, data) => {
        if (err) return cb(err);
        var pbf = new Pbf(data);
        return cb(null, Glyphs.read(pbf));
    });
}

module.exports = getGlyphs;

var args = process.argv.slice(2);
if (!args.length) {
    console.warn('Usage: `inspect ./path/to/glyphs.pbf`');
    console.warn('    options:');
    console.warn('      --raw: output raw JSON string');
    process.exit(1);
}

var file = args[0];

if (file) {
    getGlyphs(file, (err, data) => {
        if (err) console.error(err);
        else {
            if (args.length > 1 && args[1] == '--raw') console.log(JSON.stringify(data));
            else console.log(prettyjson.render(quietBuffers(data)));
        }
    });
}

function quietBuffers(data) {
    return Object.assign({}, {
        stacks: data.stacks.map(stack => {
            return Object.assign({}, {
                name: stack.name,
                range: stack.range,
                glyphs: stack.glyphs.map(glyph => {
                    return Object.assign({}, {
                        id: glyph.id,
                        bitmap: '<Buffer ...>',
                        width: glyph.width,
                        height: glyph.height,
                        left: glyph.left,
                        top: glyph.top,
                        advance: glyph.advance
                    });
                })
            });
        })
    });
}
