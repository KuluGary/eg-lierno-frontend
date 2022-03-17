const CLASS_GENDER_DICTIONARY = {
  la: {
    Pícaro: "Pícara",
    Guerrero: "Guerrera",
    Bárbaro: "Bárbara",
    Brujo: "Bruja",
    Druida: "Druida",
    Montaraz: "Montaraz",
    Mago: "Maga",
    Paladín: "Paladina",
    Clérigo: "Clériga",
    Hechicero: "Hechicera",
    Bardo: "Barda",
    Artífice: "Artífice",
  },
  le: {
    Pícaro: "Pícare",
    Guerrero: "Guerrere",
    Bárbaro: "Bárbare",
    Brujo: "Bruje",
    Druida: "Druide",
    Montaraz: "Montaraz",
    Mago: "Mague",
    Paladín: "Paladine",
    Clérigo: "Clérigue",
    Hechicero: "Hechicere",
    Bardo: "Barde",
    Artífice: "Artífice",
  },
};

export const StringUtil = {
  regex: {
    email:
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    password: /^[a-zA-Z0-9]{8,32}$/,
    username: /^[a-zA-Z0-9]{3,32}$/,
    first_name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    last_name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  },
  getInitials: (string) => string.split(" ").reduce((acc, subname) => acc + subname[0] + "", ""),
  generiza(masculino, femenino, neutro, pronombre) {
    if (pronombre) {
      if (pronombre.toLowerCase() === "el") {
        return masculino;
      } else if (pronombre.toLowerCase() === "ella" || pronombre.toLowerCase() === "la") {
        return femenino;
      } else {
        return neutro;
      }
    } else {
      return masculino;
    }
  },
  generizaClase: (clase, pronoun = "el") => {
    let claseToReturn = clase;

    if (pronoun.toLowerCase() in CLASS_GENDER_DICTIONARY) {
      claseToReturn = CLASS_GENDER_DICTIONARY[pronoun.toLowerCase()][clase];
    }

    return claseToReturn;
  },
  getCharacterSubtitle: (character) => {
    const subtitle = [];

    let classes = "";

    if (character.stats.classes?.length > 0) {
      classes = character.stats.classes
        .map((charClasses) => {
          const classString =
            StringUtil.generizaClase(charClasses["className"], character.flavor.traits.pronoun) +
            " nivel " +
            charClasses["classLevel"];
          let subclassString = "";

          if (charClasses["subclassName"]) {
            subclassString = `( ${charClasses["subclassName"]} )`;
          }

          return classString + " " + subclassString;
        })
        .join(" / ");
    } else {
      classes = `${StringUtil.generizaClase("Novato", character.flavor.pronoun)} nivel 0`;
    }

    if (character.stats.race?.name) subtitle.push(character.stats.race?.name);
    subtitle.push(classes);

    return subtitle.join(", ");
  },
  getSpellcastingName: (caster, classes) => {
    if (caster === "00000") return "Lanzamiento de conjuros innato.";

    if (!!classes) {
      const className = classes.find((charClass) => charClass.classId === caster)?.className?.toLowerCase();

      if (!!className) {
        return `Lanzamiento de conjuros de ${className}.`;
      }
    }

    return "Lanzamiento de conjuros.";
  },
  getOperatorString: (modifier) => `${modifier > 0 ? "+" : ""}${modifier}`,
  replaceMarkDownWithHtml: (md) => {
    let arr = md?.split(/\n/g);
    const str = arr
      ?.filter((el) => el !== "")
      .map((el) => `<p>${el}</p>`)
      .join("");

    return str;
  },
  getNestedKey: (string, element) => string.split(".").reduce((p, c) => (p && p[c]) || null, element),
  setNestedKey: (key, element, value) => {
    key.split(".").reduce((p, c, index) => {
      if (index === key.split(".").length - 1) {
        if (typeof p[c] !== "object" || Array.isArray(p[c])) {
          p[c] = value;
        }
        return p[c];
      } else {
        if (!p[c] || typeof p[c] !== "object") {
          p[c] = {};
        }
        return p[c];
      }
    }, element);

    return element;
  },
  isValidURL: (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(str)
  },
  stringToHsl: (string) => {
    let hash = 0;
    
    if (!string || string.length === 0) {
      return hash;
    }

    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }

    return "hsl(" + (hash % 360) + ",100%,65%)";
  },
};

export const ArrayUtil = {
  castArray(value) {
    return Array.isArray(value) ? value : [value];
  },
  isEmpty(arr) {
    return Array.isArray(arr) && arr.length === 0;
  },
  isNotEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0;
  },
  clone(arr) {
    return Array.from(arr);
  },
  indexArrayByElement(array, key) {
    return array.reduce((acc, element) => {
      const index = element[key];

      return {
        ...acc,
        [index]: element,
      };
    }, {});
  },
};
