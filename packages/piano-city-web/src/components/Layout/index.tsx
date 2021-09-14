import {FC} from 'react';
import SearchForm from '../SearchForm';
import styles from './index.module.css';

const Layout: FC = ({
  children,
}) => {
  return (
    <div>
      <header
        className={styles.header}
      >
        <div
          className={styles['header-container']}
        >
          <form
            method="get"
            className={styles.form}
            aria-label="Search Form"
          >
            <SearchForm />
          </form>
        </div>
      </header>
      <main
        className={styles['main-container']}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
