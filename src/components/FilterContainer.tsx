export const FilterContainer = () => {
  return (
    <>
      <input
        type="checkbox"
        aria-label="Vše"
        className="btn btn-outline"
        defaultChecked
      />
      <input
        type="checkbox"
        aria-label="Volný čas"
        className="btn btn-outline border-volny-cas"
      />
      <input
        type="checkbox"
        aria-label="Práce"
        className="btn btn-outline border-prace"
      />
      <input
        type="checkbox"
        aria-label="Škola"
        className="btn btn-outline border-skola"
      />
      <input
        type="checkbox"
        aria-label="Sport"
        className="btn btn-outline border-sport"
      />
      <input
        type="checkbox"
        aria-label="Koníčky"
        className="btn btn-outline border-konicky"
      />
      <input
        type="checkbox"
        aria-label="Seberealizace"
        className="btn btn-outline border-seberealizace"
      />
      <input
        type="checkbox"
        aria-label="Cestování"
        className="btn btn-outline border-cestovani"
      />
      <input
        type="checkbox"
        aria-label="Domácí práce"
        className="btn btn-outline border-domaci-prace"
      />
      <input
        type="checkbox"
        aria-label="Povinnosti"
        className="btn btn-outline border-povinnosti"
      />
      <input
        type="checkbox"
        aria-label="Spánek"
        className="btn btn-outline border-spanek"
      />
    </>
  );
};
