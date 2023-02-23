import {FC, FormEventHandler} from 'react';
import SearchForm from '../SearchForm';
import styles from './index.module.css';

type Props = {
  query?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const Layout: FC<Props> = ({
  children,
  query = '',
  onSubmit,
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
            onSubmit={onSubmit}
          >
            <SearchForm
              defaultQuery={query}
            />
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
