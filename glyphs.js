'use strict';

// glyph ========================================

exports.glyph = {read: readGlyph, write: writeGlyph};

function readGlyph(pbf, end) {
    return pbf.readFields(readGlyphField, {}, end);
}

function readGlyphField(tag, glyph, pbf) {
    if (tag === 1) glyph.id = pbf.readVarint();
    else if (tag === 2) glyph.bitmap = pbf.readBytes();
    else if (tag === 3) glyph.width = pbf.readVarint();
    else if (tag === 4) glyph.height = pbf.readVarint();
    else if (tag === 5) glyph.left = pbf.readSVarint();
    else if (tag === 6) glyph.top = pbf.readSVarint();
    else if (tag === 7) glyph.advance = pbf.readVarint();
}

function writeGlyph(glyph, pbf) {
    if (glyph.id !== undefined) pbf.writeVarint(1, glyph.id);
    if (glyph.bitmap !== undefined) pbf.writeBytes(2, glyph.bitmap);
    if (glyph.width !== undefined) pbf.writeVarint(3, glyph.width);
    if (glyph.height !== undefined) pbf.writeVarint(4, glyph.height);
    if (glyph.left !== undefined) pbf.writeSVarint(5, glyph.left);
    if (glyph.top !== undefined) pbf.writeSVarint(6, glyph.top);
    if (glyph.advance !== undefined) pbf.writeVarint(7, glyph.advance);
}

// fontstack ========================================

exports.fontstack = {read: readFontstack, write: writeFontstack};

function readFontstack(pbf, end) {
    return pbf.readFields(readFontstackField, {"glyphs": []}, end);
}

function readFontstackField(tag, fontstack, pbf) {
    if (tag === 1) fontstack.name = pbf.readString();
    else if (tag === 2) fontstack.range = pbf.readString();
    else if (tag === 3) fontstack.glyphs.push(readGlyph(pbf, pbf.readVarint() + pbf.pos));
}

function writeFontstack(fontstack, pbf) {
    if (fontstack.name !== undefined) pbf.writeString(1, fontstack.name);
    if (fontstack.range !== undefined) pbf.writeString(2, fontstack.range);
    var i;
    if (fontstack.glyphs !== undefined) for (i = 0; i < fontstack.glyphs.length; i++) pbf.writeMessage(3, writeGlyph, fontstack.glyphs[i]);
}

// glyphs ========================================

exports.glyphs = {read: readGlyphs, write: writeGlyphs};

function readGlyphs(pbf, end) {
    return pbf.readFields(readGlyphsField, {"stacks": []}, end);
}

function readGlyphsField(tag, glyphs, pbf) {
    if (tag === 1) glyphs.stacks.push(readFontstack(pbf, pbf.readVarint() + pbf.pos));
}

function writeGlyphs(glyphs, pbf) {
    var i;
    if (glyphs.stacks !== undefined) for (i = 0; i < glyphs.stacks.length; i++) pbf.writeMessage(1, writeFontstack, glyphs.stacks[i]);
}
