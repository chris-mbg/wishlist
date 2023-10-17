import ListItemForm from '@/components/add-list/ListItemForm';
import ItemForm from '@/components/edit-list/ItemForm';
import TitleForm from '@/components/edit-list/TitleForm';
import { firestore } from '@/firebase/config';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { getOne } from '@/firebase/helpers/list';
import { List, ListItem } from '@/types/types';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

function EditPage({ list }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [localList, setLocalList] = useState<List>(list);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, 'lists', localList.id),
      (doc) => {
        console.log('new snapshot', doc.data());
        setLocalList({ id: doc.id, ...doc.data() });
      }
    );
    return unsubscribe;
  }, []);

  const onItemFormSubmit = async (updates: ListItem, idx: number) => {
    const newItems = localList.items.map((item, i) =>
      i === idx ? updates : item
    );

    const docRef = doc(firestore, 'lists', list.id);
    const result = await updateDoc(docRef, {
      items: newItems,
    });
  };

  const handleNewItemSubmit = async (data: ListItem) => {
    const newItems = [...localList.items, data];

    const docRef = doc(firestore, 'lists', list.id);
    const result = await updateDoc(docRef, {
      items: newItems,
    });
  };

  return (
    <div className='mx-auto w-4/5 lg:w-3/5'>
      <h1 className='mb-4 text-center text-2xl font-semibold'>
        Redigera listan
      </h1>

      <TitleForm listId={localList.id} title={localList.title} />

      <h2>Redigera önskningar</h2>
      <div className='divide-y divide-slate-400'>
        {localList.items.map((item, idx) => (
          <ItemForm
            key={idx}
            index={idx}
            item={item}
            handleSubmit={onItemFormSubmit}
          />
        ))}
      </div>

      <p>Lägga till ny item...</p>
      <button>Lägg till nytt</button>

      <ListItemForm onSave={handleNewItemSubmit} />

      <h3>Test</h3>
      {localList.items.map((item: ListItem) => (
        <li key={item.title}>{item.title}</li>
      ))}
    </div>
  );
}

export default EditPage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  let userId: string;
  const { listId } = context.params!;

  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    console.log(token);

    userId = token.uid;
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  let result: List | undefined;

  try {
    result = await getOne(listId);
  } catch (err) {
    console.error('Error getting list...', err);
  }

  if (!result) {
    return {
      notFound: true,
    };
  }

  if (result.ownerId !== userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      list: result,
    },
  };
}) satisfies GetServerSideProps<{
  list: List;
}>;
