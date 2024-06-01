import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'

export default function Navigation() {

    const getLinkClass = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
};
    return (
        <nav>
            <ul className={css.list}>
                <li><NavLink to='/' className={getLinkClass}>Home</NavLink></li>
                <li><NavLink to='/movies' className={getLinkClass}>Movies</NavLink></li>
            </ul>
     </nav>
 )
}