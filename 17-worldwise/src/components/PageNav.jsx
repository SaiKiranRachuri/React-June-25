import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/">HomePage</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
