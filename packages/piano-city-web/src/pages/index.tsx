import type {GetServerSideProps, NextPage} from 'next';
import Layout from '../components/Layout';

type Props = {
  query: string;
}

type Query = {
  q: string;
}

const Home: NextPage<Props> = ({
  query,
}) => {
  return (
    <Layout
      query={query}
    >
      Content
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (context) => {
  const { query: queryObject } = context;
  const { q: rawQuery = '', } = queryObject;
  const query = rawQuery as string;

  return {
    props: {
      query,
    },
  };
}

export default Home;
