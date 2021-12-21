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
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
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
};

export const ArrayUtil = {
  castArray(value) {
    return Array.isArray(value) ? value : [value];
  },
  isEmpty(arr) {
    return Array.isArray(arr) && arr.length === 0;
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
