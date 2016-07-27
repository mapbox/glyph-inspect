var path = require('path');
var test = require('tape');
var glyphs = require('../index.js');

var fixture = path.resolve(__dirname, './fixtures/opensans.512.767.pbf');

test('valid glyph metadata', (t) => {
    glyphs(fixture, (err, data) => {
        t.ifError(err);
        t.ok(data);
        t.ok(data.stacks);
        t.ok(Array.isArray(data.stacks));
        t.ok(data.stacks[0].name);
        t.ok(data.stacks[0].range);
        t.equal(data.stacks[0].name, 'Open Sans Regular');
        t.equal(data.stacks[0].range, '512-767');
        t.ok(Array.isArray(data.stacks[0].glyphs));
        t.ok(data.stacks[0].glyphs.every(g => {
            return Object.keys(g).every(k => {
                return g[k] instanceof Buffer || !isNaN(parseInt(g[k]));
            });
        }));
        t.end();
    });
});
