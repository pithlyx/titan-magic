import { useState } from "react";
import { Link } from 'react-router-dom';

function NavButton({ label, linkTo = '' , handleClick = ()=>console.log("click")}) {
  const [toggle, setToggle] = useState(true);

  return (
    <Link to={linkTo}>
      <button
        onClick={handleClick}
        className={`px-4 py-2 text-sm  border rounded-lg text-gray-200 bg-secondary border-container  hover:border-container hover:bg-primary focus:outline-none`}
      >
        {label}
      </button>
    </Link>
  );
}

export default NavButton;
