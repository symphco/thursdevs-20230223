import type {NextPage} from 'next';
import ActionButton, {ButtonSize, ButtonVariant} from '../components/ActionButton';

const Home: NextPage = () => {
  return (
    <div>
      <ActionButton
        size={ButtonSize.LARGE}
        variant={ButtonVariant.PRIMARY}
      >
        Button
      </ActionButton>
    </div>
  )
}

export default Home
