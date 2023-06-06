import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { Link, useLocation } from "react-router-dom";
import { HEADER_LINKS } from '../../lib/consts/navigation';
import className from "classnames";

const linkClasses =
  "flex items-center gap-2 font-light px-6 py-2 rounded-3 hover:bg-white hover:text-black hover:no-underline active:bg-gray-100 rounded-sm text-base cursor-pointer ";

const Header = () => {
  return (
    <div>
      <nav className="flex flex-row justify-around items-center px-2 py-3 bg-transprant mb-3">
        <div className="flex text-2xl font-bold">
          <div>NOISE TRACKER</div>
        </div>
        <div className='flex flex1' >
          {HEADER_LINKS.map((item) => (
          <HeaderLink key={item.key} item={item} />
          ))}
        </div>
        <div className="flex items-center">
          <a className="px-3 py-2 mr-20 flex items-center text-3xl uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
              <BsGithub ></BsGithub>
          </a>
        </div>
      </nav>
    </div>
  )
}

function HeaderLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={className(
        pathname === item.path
          ? " bg-transprant text-white"
          : "text-gray-300",
        linkClasses
      )}
    >
      <span className="text-lg">{item.icon}</span>
      <span className="text-lg">{item.label}</span>
    </Link>
  );
}

export default Header
