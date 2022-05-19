import { ArrayUtil, StringUtil } from "./string-util";
import customizable_stats from "helpers/json/customizable_stats";
import { getModifier, getSpellSlots, getStatBonus } from "@lierno/dnd-helpers";
import { getOperatorString } from "@lierno/core-helpers";

const skillsJson = customizable_stats.skills;

export const statLabels = {
  strength: "Fuerza",
  dexterity: "Destreza",
  constitution: "Constitución",
  intelligence: "Inteligencia",
  wisdom: "Sabiduría",
  charisma: "Carisma",
};

const casterType = {
  fullcaster: ["Druida", "Bardo", "Clérigo", "Mago", "Hechicero", "Brujo"],
  halfcaster: ["Paladín", "Montaraz", "Artífice"],
};

const fullcaster = {
  1: {
    spellSlots: [2],
  },
  2: {
    spellSlots: [3],
  },
  3: {
    spellSlots: [4, 2],
  },
  4: {
    spellSlots: [4, 3],
  },
  5: {
    spellSlots: [4, 3, 2],
  },
  6: {
    spellSlots: [4, 3, 3],
  },
  7: {
    spellSlots: [4, 3, 3, 1],
  },
  8: {
    spellSlots: [4, 3, 3, 2],
  },
  9: {
    spellSlots: [4, 3, 3, 3, 1],
  },
  10: {
    spellSlots: [4, 3, 3, 3, 2],
  },
  11: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  12: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  13: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  14: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  15: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  16: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  17: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  18: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  19: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  20: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
};

export const spellcasters = {
  // Innato
  "00000": {
    components: {
      material: false,
      somatic: true,
      verbal: true,
    },
  },
  // Bardo
  "5ed2b6f0dfd4d4a1adcbbba4": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "charisma",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      2: {
        spellSlots: [3],
        cantripsKnown: 2,
        spellsKnown: 5,
      },
      3: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
        spellsKnown: 6,
      },
      4: {
        spellSlots: [4, 3],
        cantripsKnown: 3,
        spellsKnown: 7,
      },
      5: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 8,
      },
      6: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
        spellsKnown: 9,
      },
      7: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 10,
      },
      8: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 11,
      },
      9: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 12,
      },
      10: {
        spellSlots: [4, 3, 3, 3, 2],
        cantrupsKnown: 4,
        spellsKnown: 14,
      },
      11: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantrupsKnown: 4,
        spellsKnown: 15,
      },
      12: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantrupsKnown: 4,
        spellsKnown: 15,
      },
      13: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 16,
      },
      14: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 18,
      },
      15: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 19,
      },
      16: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 19,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 20,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
    },
  },
  // Clérigo
  "5ec02407f44b2b688355a566": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "wisdom",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 3,
      },
      2: {
        spellSlots: [3],
        cantripsKnown: 3,
      },
      3: {
        spellSlots: [4, 2],
        cantripsKnown: 3,
      },
      4: {
        spellSlots: [4, 3],
        cantripsKnown: 4,
      },
      5: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 4,
      },
      6: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 4,
      },
      7: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 4,
      },
      8: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 4,
      },
      9: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 4,
      },
      10: {
        spellSlots: [4, 3, 3, 3, 2],
        cantripsKnown: 5,
      },
      11: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 5,
      },
      12: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 5,
      },
      13: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 5,
      },
      14: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 5,
      },
      15: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 5,
      },
      16: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 5,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
    },
  },
  // Druida
  "5fe145ae267d9afc8e956c0f": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "wisdom",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      2: {
        spellSlots: [3],
        cantripsKnown: 2,
        spellsKnown: 5,
      },
      3: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
        spellsKnown: 6,
      },
      4: {
        spellSlots: [4, 3],
        cantripsKnown: 3,
        spellsKnown: 7,
      },
      5: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 8,
      },
      6: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
        spellsKnown: 9,
      },
      7: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 10,
      },
      8: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 11,
      },
      9: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 12,
      },
      10: {
        spellSlots: [4, 3, 3, 3, 2],
        cantrupsKnown: 4,
        spellsKnown: 14,
      },
      11: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantrupsKnown: 4,
        spellsKnown: 15,
      },
      12: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantrupsKnown: 4,
        spellsKnown: 15,
      },
      13: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 16,
      },
      14: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 18,
      },
      15: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 19,
      },
      16: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 19,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 20,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantrupsKnown: 4,
        spellsKnown: 22,
      },
    },
  },
  // Paladín
  "5f6630144af7eaef9120f98e": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "charisma",
    level: {
      1: {
        spellSlots: [],
      },
      2: {
        spellSlots: [2],
      },
      3: {
        spellSlots: [3],
      },
      4: {
        spellSlots: [3],
      },
      5: {
        spellSlots: [4, 2],
      },
      6: {
        spellSlots: [4, 2],
      },
      7: {
        spellSlots: [4, 3],
      },
      8: {
        spellSlots: [4, 3],
      },
      9: {
        spellSlots: [4, 3, 2],
      },
      10: {
        spellSlots: [4, 3, 2],
      },
      11: {
        spellSlots: [4, 3, 3],
      },
      12: {
        spellSlots: [4, 3, 3],
      },
      13: {
        spellSlots: [4, 3, 3, 1],
      },
      14: {
        spellSlots: [4, 3, 3, 1],
      },
      15: {
        spellSlots: [4, 3, 3, 2],
      },
      16: {
        spellSlots: [4, 3, 3, 2],
      },
      17: {
        spellSlots: [4, 3, 3, 3, 1],
      },
      18: {
        spellSlots: [4, 3, 3, 3, 1],
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2],
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2],
      },
    },
  },
  // Montaraz
  "5ec02fbcf44b2b688355aaeb": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "wisdom",
    level: {
      1: {
        spellSlots: [],
      },
      2: {
        spellSlots: [2],
      },
      3: {
        spellSlots: [3],
      },
      4: {
        spellSlots: [3],
      },
      5: {
        spellSlots: [4, 2],
      },
      6: {
        spellSlots: [4, 2],
      },
      7: {
        spellSlots: [4, 3],
      },
      8: {
        spellSlots: [4, 3],
      },
      9: {
        spellSlots: [4, 3, 2],
      },
      10: {
        spellSlots: [4, 3, 2],
      },
      11: {
        spellSlots: [4, 3, 3],
      },
      12: {
        spellSlots: [4, 3, 3],
      },
      13: {
        spellSlots: [4, 3, 3, 1],
      },
      14: {
        spellSlots: [4, 3, 3, 1],
      },
      15: {
        spellSlots: [4, 3, 3, 2],
      },
      16: {
        spellSlots: [4, 3, 3, 2],
      },
      17: {
        spellSlots: [4, 3, 3, 3, 1],
      },
      18: {
        spellSlots: [4, 3, 3, 3, 1],
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2],
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2],
      },
    },
  },
  // Hechicero
  "6025567f9f3d039145e02731": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "charisma",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 4,
        spellsKnown: 2,
      },
      2: {
        spellSlots: [3],
        cantripsKnown: 4,
        spellsKnown: 3,
      },
      3: {
        spellSlots: [4, 2],
        cantripsKnown: 4,
        spellsKnown: 4,
      },
      4: {
        spellSlots: [4, 3],
        cantripsKnown: 5,
        spellsKnown: 5,
      },
      5: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 5,
        spellsKnown: 6,
      },
      6: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 5,
        spellsKnown: 7,
      },
      7: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 5,
        spellsKnown: 8,
      },
      8: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 5,
        spellsKnown: 9,
      },
      9: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 5,
        spellsKnown: 10,
      },
      10: {
        spellSlots: [4, 3, 3, 3, 2],
        cantripsKnown: 6,
        spellsKnown: 11,
      },
      11: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 6,
        spellsKnown: 12,
      },
      12: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 6,
        spellsKnown: 12,
      },
      13: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 13,
      },
      14: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 13,
      },
      15: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 14,
      },
      16: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 14,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 15,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 15,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 15,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 6,
        spellsKnown: 15,
      },
    },
  },
  // Brujo
  "5ec030b0f44b2b688355ab60": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "charisma",
    level: {
      1: {
        spellSlots: [1],
        cantripsKnown: 2,
        spellsKnown: 2,
      },
      2: {
        spellSlots: [2],
        cantripsKnown: 2,
        spellsKnown: 3,
      },
      3: {
        spellSlots: [0, 2],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      4: {
        spellSlots: [0, 2],
        cantripsKnown: 3,
        spellsKnown: 5,
      },
      5: {
        spellSlots: [0, 0, 2],
        cantripsKnown: 3,
        spellsKnown: 6,
      },
      6: {
        spellSlots: [0, 0, 2],
        cantripsKnown: 3,
        spellsKnown: 7,
      },
      7: {
        spellSlots: [0, 0, 0, 2],
        cantripsKnown: 3,
        spellsKnown: 8,
      },
      8: {
        spellSlots: [0, 0, 0, 2],
        cantripsKnown: 3,
        spellsKnown: 9,
      },
      9: {
        spellSlots: [0, 0, 0, 0, 2],
        cantripsKnown: 3,
        spellsKnown: 10,
      },
      10: {
        spellSlots: [0, 0, 0, 0, 2],
        cantripsKnown: 4,
        spellsKnown: 10,
      },
      11: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 11,
      },
      12: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 11,
      },
      13: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 12,
      },
      14: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 12,
      },
      15: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 13,
      },
      16: {
        spellSlots: [0, 0, 0, 0, 3],
        cantripsKnown: 4,
        spellsKnown: 13,
      },
      17: {
        spellSlots: [0, 0, 0, 0, 4],
        cantripsKnown: 4,
        spellsKnown: 14,
      },
      18: {
        spellSlots: [0, 0, 0, 0, 4],
        cantripsKnown: 4,
        spellsKnown: 14,
      },
      19: {
        spellSlots: [0, 0, 0, 0, 4],
        cantripsKnown: 4,
        spellsKnown: 15,
      },
      20: {
        spellSlots: [0, 0, 0, 0, 4],
        cantripsKnown: 4,
        spellsKnown: 15,
      },
    },
  },
  // Mago
  "5ec03176f44b2b688355abb7": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "intelligence",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 3,
      },
      2: {
        spellSlots: [3],
        cantripsKnown: 3,
      },
      3: {
        spellSlots: [4, 2],
        cantripsKnown: 3,
      },
      4: {
        spellSlots: [4, 3],
        cantripsKnown: 4,
      },
      5: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 4,
      },
      6: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 4,
      },
      7: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 4,
      },
      8: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 4,
      },
      9: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 4,
      },
      10: {
        spellSlots: [4, 3, 3, 3, 2],
        cantripsKnown: 5,
      },
      11: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 5,
      },
      12: {
        spellSlots: [4, 3, 3, 3, 2, 1],
        cantripsKnown: 5,
      },
      13: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 5,
      },
      14: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1],
        cantripsKnown: 5,
      },
      15: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 5,
      },
      16: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
        cantripsKnown: 5,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        cantripsKnown: 5,
      },
    },
  },
  // Artífice
  "615764cf69c41a2d46d7b23a": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "intelligence",
    level: {
      1: {
        spellSlots: [2],
        cantripsKnown: 2,
      },
      2: {
        spellSlots: [2],
        cantripsKnown: 2,
      },
      3: {
        spellSlots: [3],
        cantripsKnown: 2,
      },
      4: {
        spellSlots: [3],
        cantripsKnown: 2,
      },
      5: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
      },
      6: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
      },
      7: {
        spellSlots: [4, 3],
        cantripsKnown: 2,
      },
      8: {
        spellSlots: [4, 3],
        cantripsKnown: 2,
      },
      9: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 2,
      },
      10: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
      },
      11: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
      },
      12: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
      },
      13: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 3,
      },
      14: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 4,
      },
      15: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 4,
      },
      16: {
        spellSlots: [4, 3, 3, 2],
        cantripsKnown: 4,
      },
      17: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 4,
      },
      18: {
        spellSlots: [4, 3, 3, 3, 1],
        cantripsKnown: 4,
      },
      19: {
        spellSlots: [4, 3, 3, 3, 2],
        cantripsKnown: 4,
      },
      20: {
        spellSlots: [4, 3, 3, 3, 2],
        cantripsKnown: 4,
      },
    },
  },
  // Guerrero: Caballero sobrenatural
  "5ea1843b8bfa3a13ac19cc07": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "intelligence",
    level: {
      3: {
        spellSlots: [2],
        cantripsKnown: 2,
        spellsKnown: 3,
      },
      4: {
        spellSlots: [3],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      5: {
        spellSlots: [3],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      6: {
        spellSlots: [3],
        cantripsKnown: 2,
        spellsKnown: 4,
      },
      7: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
        spellsKnown: 5,
      },
      8: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
        spellsKnown: 6,
      },
      9: {
        spellSlots: [4, 2],
        cantripsKnown: 2,
        spellsKnown: 6,
      },
      10: {
        spellSlots: [4, 3],
        cantripsKnown: 3,
        spellsKnown: 7,
      },
      11: {
        spellSlots: [4, 3],
        cantripsKnown: 3,
        spellsKnown: 8,
      },
      12: {
        spellSlots: [4, 3],
        cantripsKnown: 3,
        spellsKnown: 8,
      },
      13: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 9,
      },
      14: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 10,
      },
      15: {
        spellSlots: [4, 3, 2],
        cantripsKnown: 3,
        spellsKnown: 10,
      },
      16: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
        spellsKnown: 11,
      },
      17: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
        spellsKnown: 11,
      },
      18: {
        spellSlots: [4, 3, 3],
        cantripsKnown: 3,
        spellsKnown: 11,
      },
      19: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 12,
      },
      20: {
        spellSlots: [4, 3, 3, 1],
        cantripsKnown: 3,
        spellsKnown: 13,
      },
    },
  },
  // Pícaro: Embaucador arcano
  "5ec03048f44b2b688355ab2c": {
    components: {
      material: true,
      somatic: true,
      verbal: true,
    },
    ability: "intelligence",
    level: {
      3: {
        spellSlots: [2],
        spellsKnown: 3,
      },
      4: {
        spellSlots: [3],
        spellsKnown: 4,
      },
      5: {
        spellSlots: [3],
        spellsKnown: 4,
      },
      6: {
        spellSlots: [3],
        spellsKnown: 4,
      },
      7: {
        spellSlots: [4, 2],
        spellsKnown: 5,
      },
      8: {
        spellSlots: [4, 2],
        spellsKnown: 6,
      },
      9: {
        spellSlots: [4, 2],
        spellsKnown: 6,
      },
      10: {
        spellSlots: [4, 3],
        spellsKnown: 7,
      },
      11: {
        spellSlots: [4, 3],
        spellsKnown: 8,
      },
      12: {
        spellSlots: [4, 3],
        spellsKnown: 8,
      },
      13: {
        spellSlots: [4, 3, 2],
        spellsKnown: 9,
      },
      14: {
        spellSlots: [4, 3, 2],
        spellsKnown: 10,
      },
      15: {
        spellSlots: [4, 3, 2],
        spellsKnown: 10,
      },
      16: {
        spellSlots: [4, 3, 3],
        spellsKnown: 11,
      },
      17: {
        spellSlots: [4, 3, 3],
        spellsKnown: 11,
      },
      18: {
        spellSlots: [4, 3, 3],
        spellsKnown: 11,
      },
      19: {
        spellSlots: [4, 3, 3, 1],
        spellsKnown: 12,
      },
      20: {
        spellSlots: [4, 3, 3, 1],
        spellsKnown: 13,
      },
    },
  },
};

const experienceByCr = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

const innateSpellCastingLabels = {
  atWill: "A voluntad",
  perDay3: "3/día",
  perDay2: "2/día",
  perDay1: "1/día",
};

export const CreatureCalculations = {
  modifier: (stat) => Math.floor((stat - 10) / 2),
  getPassivePerception: (stats, character = {}) => {
    const { abilityScores, proficiencyBonus, skills } = stats;
    const proficiencyModifier =
      skills["perception"].expertise === true
        ? proficiencyBonus * 2
        : skills["perception"].proficient === true
        ? proficiencyBonus
        : 0;

    const extraBonus = getStatBonus("passivePerception", character, "stats.abilityScores.wisdom") ?? 0;

    return 10 + getModifier(abilityScores.wisdom) + getModifier(extraBonus) + proficiencyModifier;
  },
  getSavingThrowString: (abilityScores, savingThrows, proficiency, character) => {
    const modifiers = Object.keys(savingThrows ?? {})
      .filter((key) => savingThrows[key].proficient || savingThrows[key].expertise)
      .map((key) => {
        const abilityScore = getStatBonus(`stats.abilityScores.${key}`, character, `stats.abilityScores.${key}`);
        let modifier = getModifier(abilityScore);

        if (savingThrows[key].expertise) {
          modifier += proficiency * 2;
        } else if (savingThrows[key].proficient) {
          modifier += proficiency;
        }

        return `${statLabels[key]} ${getOperatorString(modifier)} `;
      });

    return modifiers.join(", ");
  },
  getAbilitiesString: (abilityScores, skills, proficiency, character) => {
    if (!!abilityScores && !!skills) {
      const modifiers = Object.entries(skills)
        .filter(([_, skill]) => skill.proficient || skill.expertise)
        .map(([name, skill]) => {
          const abilityScore = getStatBonus(
            `stats.abilityScores.${skill.modifier}`,
            character,
            `stats.abilityScores.${skill.modifier}`
          );

          let modifier = getModifier(abilityScore);

          if (skill.expertise) {
            modifier += parseInt(proficiency) * 2;
          } else if (skill.proficient) {
            modifier += parseInt(proficiency);
          }

          return `${skillsJson[name]?.name} ${getOperatorString(modifier)} (${statLabels[skill.modifier]})`;
        });

      return modifiers.join(", ");
    }

    return null;
  },
  getAttackStrings: (attack, proficiency, character) => {
    const attackTypeDictionary = {
      melee: "melé",
      distance: "distancia",
    };

    let toHitBonus = 0;
    let damageBonus = 0;
    let bonusStat = attack.data.modifier ?? "strength";
    let type = [];
    let range = [];
    let indexes = [];

    Object.entries(attack.data.damage).forEach(([key, damage]) => {
      if (key in attackTypeDictionary) {
        type.push(attackTypeDictionary[key]);

        if (typeof damage.range === "object") {
          const { short, long } = damage.range;

          range.push(`${short}/${long} ft.`);
        } else range.push(`${damage.range} ft.`);
      }
    });

    type = `Ataque de arma ${type.join(" o ")}.`;
    range = range.join(" o ");

    const abilityScore = getStatBonus(`stats.abilityScores.${bonusStat}`, character);

    toHitBonus = getModifier(abilityScore) + (attack.proficient ? proficiency : 0);

    damageBonus = getModifier(abilityScore);

    return `<p><em>${type}</em> 1d20 ${StringUtil.getOperatorString(
      toHitBonus
    )} al golpe, alcance ${range} Daño ${Object.entries(attack.data.damage)
      .filter(([_, value]) => {
        const die = `${value.numDie}d${value.dieSize}`;
        const isIn = !indexes.includes(die);

        indexes.push(die);
        return isIn;
      })
      .map(([key, dmg]) => {
        let rangeStr;

        if (key === "melee") {
          rangeStr = `melé`;
        }

        if (key === "distance") {
          if (rangeStr === "melé") {
            rangeStr += ` o distancia`;
          } else {
            rangeStr = `distancia`;
          }
        }

        if (key === "versatile") {
          return `${dmg.numDie}d${dmg.dieSize} ${
            damageBonus >= 0 ? "+" : ""
          }${damageBonus} ${dmg.type.toLowerCase()} si es usado con dos manos`;
        }

        if (key === "extraDamage") {
          const median = ((dmg.dieSize + 1) * dmg.numDie) / dmg.numDie;

          return `y ${median} (${dmg.numDie}d${dmg.dieSize}) ${dmg.type.toLowerCase()} de daño adicional`;
        }

        return `${dmg.numDie}d${dmg.dieSize} ${damageBonus >= 0 ? "+" : ""}${damageBonus} ${dmg.type.toLowerCase()}`;
      })
      .join(", ")}.</p>`;
  },
  getSpellSlots: (spellLevel, classes, spellcasting) => {
    if (classes.length > 10) {
      return fullcaster[spellcasting.level]?.spellSlots[spellLevel];
    } else {
      let classLevel = 0;

      classes?.forEach((charClass) => {
        if (casterType.fullcaster.includes(charClass.className)) {
          classLevel += charClass.classLevel;
        } else if (casterType.halfcaster.includes(charClass.className)) {
          if (charClass.className === "Artífice") {
            classLevel += Math.ceil(charClass.classLevel / 2);
          } else {
            classLevel += Math.floor(charClass.classLevel / 2);
          }
        } else {
          classLevel += Math.floor(charClass.classLevel / 3);
        }
      });

      return fullcaster[classLevel]?.spellSlots[spellLevel];
    }
  },
  getSpellStrings: (spellcasting, spellData, abilityScores, name, classes, proficiency) => {
    const { spells, modifier, caster } = spellcasting;

    let spellDC = "N/A";
    let spellBonus = "N/A";

    const spellByLevel = {};

    Object.keys(spells).forEach((key) => {
      spells[key].forEach((spell) => {
        const element = spellData.find((spellDataElement) => spellDataElement._id === spell.spellId);

        if (key in spellByLevel) {
          spellByLevel[key].push(element.name);
        } else {
          spellByLevel[key] = [element.name];
        }
      });
    });

    if (!!modifier) {
      const abilityScoreModifier = getModifier(abilityScores[modifier]);

      spellDC = 8 + parseInt(proficiency) + parseInt(abilityScoreModifier);
      spellBonus = parseInt(proficiency) + parseInt(abilityScoreModifier);
    }

    const spellString = {
      description: `<p>La habilidad de conjuración es ${
        statLabels[modifier]
      } (salvación de conjuro CD ${spellDC}, ${StringUtil.getOperatorString(
        spellBonus
      )} al golpe con ataques de hechizo). Tiene los siguientes hechizos preparados:</p><ul>`,
    };

    Object.keys(spellByLevel).forEach((key) => {
      const spellStr = spellByLevel[key].map((i, index) => (index > 0 ? i.toLowerCase() : i)).join(", ");

      if (caster === "00000") {
        spellString.description += `<li><b>${innateSpellCastingLabels[key]}</b>: ${spellStr}</li>`;
      } else {
        spellString.description += `<li>${
          parseInt(key) === 0
            ? "<b>Trucos (a voluntad)</b>"
            : `<b>Nivel ${key} (${getSpellSlots(parseInt(key) - 1, classes, spellcasting)} huecos)</b>`
        }: ${spellStr}.</li>`;
      }
    });

    return spellString.description;
  },
  getExperienceByCr: (cr) => {
    return experienceByCr[cr];
  },
  getSpeedString: (speed) => {
    const speedDictionary = { land: "en tierra", air: "en el aire", swim: "en el agua" };
    const speeds = Object.keys(speed)
      .filter((key) => speed[key] > 0)
      .map((key) => `${speed[key]}ft. (${speedDictionary[key]})`);

    return speeds.join(", ");
  },
  getStatBonus: (key, creature, fallback) => {
    const arrayBonusSelected = creature?.stats?.statBonus?.filter((bonus) => bonus.modifier === key);

    if (ArrayUtil.isNotEmpty(arrayBonusSelected)) {
      const bonusSelected = arrayBonusSelected.reduce((results, current) => {
        return {
          ...current,
          bonus: (results.bonus ?? 0) + current.bonus,
        };
      }, {});

      let baseBonus = StringUtil.getNestedKey(bonusSelected.modifier, creature);

      if (!baseBonus && !!fallback) {
        baseBonus = StringUtil.getNestedKey(fallback, creature);
      }

      return baseBonus + (bonusSelected.bonus ?? 0);
    }

    if (!!fallback) return StringUtil.getNestedKey(fallback, creature);
  },
};
