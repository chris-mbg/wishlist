import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { List, ListItem } from '@/types/types';
import ListItemForm from '@/components/add-list/ListItemForm';
import ItemForm from '@/components/edit-list/ItemForm';
import TitleForm from '@/components/edit-list/TitleForm';
import ListModel from '@/models/List';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import EditItem from '@/components/edit-list/EditItem';

function EditPage({ list }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [localList, setLocalList] = useState<List>(list);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     doc(firestore, 'lists', localList.id),
  //     (doc) => {
  //       console.log('new snapshot', doc.data());
  //       setLocalList({ id: doc.id, ...doc.data() });
  //     }
  //   );
  //   return unsubscribe;
  // }, []);

  const onItemFormSubmit = async (updates: ListItem) => {
    // const newItems = localList.items.map((item, i) =>
    //   i === idx ? updates : item
    // );
    // const docRef = doc(firestore, 'lists', list.id);
    // const result = await updateDoc(docRef, {
    //   items: newItems,
    // });
  };

  const handleNewItemSubmit = async (data: ListItem) => {
    // const newItems = [...localList.items, data];
    // const docRef = doc(firestore, 'lists', list.id);
    // const result = await updateDoc(docRef, {
    //   items: newItems,
    // });
  };

  return (
    <div className='mx-auto w-4/5 lg:w-3/5'>
      <h1 className='mb-4 text-center text-2xl font-semibold'>
        Redigera listan
      </h1>

      <TitleForm listId={localList._id} title={localList.title} />

      <h2>Redigera önskningar</h2>
      <ul className='divide-y divide-slate-400'>
        {localList.items.map((item) => (
          <EditItem
            key={item._id}
            item={item}
            onItemFormSubmit={onItemFormSubmit}
          />
        ))}
      </ul>

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
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  let doc: List | undefined;
  const { listId } = context.params!;

  try {
    doc = await ListModel.findById(listId).populate('items').exec();
  } catch (err) {
    console.log('Could not find list');
  }

  if (!doc) {
    return {
      notFound: true,
    };
  }

  if (doc.owner !== session.user?.email) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      list: JSON.parse(JSON.stringify(doc)),
    },
  };
}) satisfies GetServerSideProps<{
  list: List;
}>;
