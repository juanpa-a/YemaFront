import React from "react";

export default ({ lang, setLang }) => {
  const toggleLang = () => {
    if (lang === "es") setLang("en");
    else if (lang === "en") setLang("es");
  };

  const dict = {
    en: {
      title: "Yema test, Juan Pablo Ascencio"
    },
    es: {
      title: "Prueba Yema, Juan Pablo Ascencio"
    }
  }

  return (
    <nav className="navbar navbar-dark bg-info">
      <span className="navbar-brand mb-0 h1">{dict[lang].title}</span>
      <button 
        type="button" 
        className="btn btn-info"
        onClick={toggleLang}
      >{lang}</button>
    </nav>
  );
};
