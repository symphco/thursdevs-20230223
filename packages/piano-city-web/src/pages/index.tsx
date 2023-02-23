import type {GetServerSideProps, NextPage} from 'next';
import Layout from '../components/Layout';
import {FormEventHandler, useEffect, useState} from 'react';
import getFormValues from '@theoryofnekomata/formxtra';
import {useRouter} from 'next/router';
import Piano from '../models/Piano';
import Item from '../components/Item';
import List from '../components/List';

type Props = {
  query: string;
}

type Query = {
  q: string;
}

const Home: NextPage<Props> = ({
  query,
}) => {
  const router = useRouter();
  const [data, setData] = useState<Piano[]>();

  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      let responseData;
      if (url.includes('?')) {
        const query = new URLSearchParams(url.slice(url.indexOf('?')));
        const q = query.get('q');
        const response = await fetch(`http://localhost:8080/pianos?q=${q}`);
        responseData = await response.json();
      }
      setData(responseData);
    }
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const loadData = async (query) => {
      const response = await fetch(`http://localhost:8080/pianos?q=${query}`);
      const responseData = await response.json();
      setData(responseData);
    }

    void loadData(query);
  }, [query]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const values = getFormValues(e.currentTarget);
    await router.replace({
      query: {},
    }, undefined, {
      shallow: true,
    });
    await router.replace({
      query: values,
    }, undefined, {
      shallow: true,
    });
  }

  return (
    <Layout
      query={query}
      onSubmit={handleFormSubmit}
    >
      {
        Array.isArray(data)
        && (
          <List
            items={data}
            itemComponent={Item}
            itemKey={(item: Piano) => item.id}
          />
        )
      }
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
