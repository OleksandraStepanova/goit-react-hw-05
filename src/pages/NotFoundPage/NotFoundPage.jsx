import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p>
        Sorry, page not found! Please go to <Link to="/" className={css.link}>home page</Link>!
      </p>
    </div>
  );
}