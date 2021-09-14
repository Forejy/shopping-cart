import { useState, useParams } from 'react';
import { categoriesLinkNames, categoriesNames  } from './Utilities';
import '../Styles/Header.scss';
import { useEffect } from 'react/cjs/react.development';

export function Header(props) {
  let pageName = props.pageName;

  useEffect(() => {
    console.log("pageName?", pageName)
  }, [pageName])

  const getUrl = () => {
    let len = categoriesLinkNames.length;
    let links = new Array(len);
    let path = "http://localhost:3000/category/";

    for(let i = 0; i < len; i++) {
      const currentCategory = categoriesLinkNames[i];
      let isCurrent = currentCategory === pageName ? " NavItem-current" : "";
      
      links[i] = <a className={ "NavItem" + isCurrent } href={ path + currentCategory } title={ categoriesNames[i] }>{ categoriesNames[i] }</a>
    }

    console.log(links);

    return(links)
  }

  return(
    <header className="HeaderWrapper">
      <article className="Header">
        <section><a href="http://localhost:3000/">Accueil</a></section>
        <div>
          |
        </div>
        <nav className="Navbar">
            { getUrl() }
        </nav>
      </article>
    </header>
  )
}