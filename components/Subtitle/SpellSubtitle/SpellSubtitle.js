const SpellSubtitle = ({ spell }) => {
  return (
    <>
      {`${
        spell.stats.level === 0 ? "Truco " : `Hechizo de nivel ${spell.stats.level} `
      } de ${spell.stats.school.toLowerCase()}`}
    </>
  );
};

export default SpellSubtitle;
