import Input from '../Input';
import ActionButton, {ButtonType} from '../ActionButton';
import styles from './index.module.css';

const SearchForm = () => {
  return (
    <div
      className={styles['fields-container']}
    >
      <div
        className={styles['input-wrapper']}
      >
        <Input
          type="search"
          block
          label="Query"
          name="q"
          placeholder="Search for brands, models&hellip;"
        />
      </div>
      <div>
        <ActionButton
          type={ButtonType.SUBMIT}
        >
          Search
        </ActionButton>
      </div>
    </div>
  )
}

export default SearchForm
