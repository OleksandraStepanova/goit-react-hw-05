import { Link, useLocation } from "react-router-dom";
import css from './GoBackBtn.module.css'
import { useRef } from "react";


export const GoBackBtn = () => {
  const location = useLocation();
  const backLink = useRef(location.state??'/movies')
  return (
    <Link className={ css.link} to={backLink.current}>Go back</Link>
  );
};
