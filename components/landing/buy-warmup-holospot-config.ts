const EMBOSS_DOC = {
  v: 1,
  e: [
    {
      i: "e1",
      t: "f",
      n: "Title",
      p: {
        logo: "/logos/buy-warmup-title.svg",
        x: 31.5,
        y: 60,
        width: 54,
        height: 22,
        shoulder: 0.1,
        profile: "bevel",
        puff: 0.32,
        foil: "concentric",
        pitch: 860,
        grooveAngle: 110,
        foilCoverage: 1,
        edgeBreakup: 0.23,
        gloss: 0.69,
        sparkleSize: 225,
        foilBump: 0.29,
      },
    },
    {
      i: "e2",
      t: "f",
      n: "Buy",
      p: {
        logo: "/logos/buy-warmup-button.svg",
        x: 31.5,
        y: 36,
        width: 26,
        height: 9,
        profile: "bevel",
        puff: 0.35,
        foil: "gold",
        gloss: 0.75,
        foilBump: 0.24,
      },
    },
  ],
};

/** holo.spot Copy settings blob (image / foil emboss look). */
export const BUY_WARMUP_HOLO_BLOB = {
  holoDev: 1,
  entity: "image",
  material: "emboss",
  values: {
    "emboss.print": "upload",
    "emboss.paperColour": "#050505",
    "emboss.stock": "cotton",
    "emboss.textureStrength": 0.45,
    "emboss.thickness": 0.35,
    "display.ev": 0.62,
    "grain.on": true,
    "grain.amount": 0.35,
    "emboss.doc": JSON.stringify(EMBOSS_DOC),
  },
  pose: { rx: 1.5, ry: 27.5, rz: 0, flip: false },
};