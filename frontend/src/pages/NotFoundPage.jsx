import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.notFound} data-testid="not-found">
      <p className={`gradient-text ${styles.code}`} aria-hidden="true">404</p>
      <h1 className={styles.title}>Pagina nu există.</h1>
      <p className="info">Adresa cerută nu duce nicăieri.</p>
      <Link to="/" viewTransition className="btn">
        Înapoi la intervenții
      </Link>
    </section>
  );
}
