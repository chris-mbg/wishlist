import { FaCirclePlus, FaCircleXmark } from 'react-icons/fa6';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { List, ListItem } from '@/types/types';
import ListModel from '@/models/List';
import ListItemForm from '@/components/add-list/ListItemForm';
import TitleForm from '@/components/edit-list/TitleForm';
import EditItem from '@/components/edit-list/EditItem';
import dbConnect from '@/utils/dbConnect';
import Button from '@/components/ui/Button';
import DeleteListButton from '@/components/edit-list/DeleteListButton';

function EditPage({ list }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [localList, setLocalList] = useState<List>(list);
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  const updateList = async () => {
    // TODO Loading
    const res = await fetch(`/api/lists/${list._id}`);
    const data = await res.json();

    if (res.ok) {
      setLocalList(data.data);
    } else {
      // TODO Error message
      console.log('Error updating list data');
    }
  };

  const onItemFormSubmit = async (
    updates: Partial<ListItem>,
    itemId: string
  ) => {
    const response = await fetch(`/api/lists/${list._id}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, ...updates }),
    });

    if (response.ok) {
      updateList();
    }
  };

  const handleNewItemSubmit = async (data: Partial<ListItem>) => {
    const result = await fetch(`/api/lists/${list._id}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      console.log('Not item save');
      // TODO error message
    } else {
      setShowNewItemForm(false);

      const res = await fetch(`/api/lists/${list._id}`);
      const data = await res.json();

      if (res.ok) {
        setLocalList(data.data);
      }
    }
  };

  const onItemDelete = async (itemId: string) => {
    // TODO show confirm modal

    const res = await fetch(`/api/lists/${list._id}/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      console.log('Error deleting item');
    } else {
      updateList();
    }
  };

  // TODO Delete whole list functionality --> show confirm modal

  return (
    <div className='mx-auto md:w-4/5 lg:w-3/5'>
      <h1 className='page-title'>Redigera listan</h1>

      <TitleForm listId={localList._id} title={localList.title} />

      <h2 className='mt-2 text-center'>Redigera önskningar</h2>
      <ul className='mt-4 text-slate-900'>
        {localList.items.map((item) => (
          <EditItem
            key={item._id}
            item={item}
            onItemFormSubmit={onItemFormSubmit}
            onItemDelete={onItemDelete}
          />
        ))}
      </ul>

      <Button
        className='ml-auto'
        onClick={() => setShowNewItemForm((prevVal) => !prevVal)}
      >
        {showNewItemForm ? (
          <>
            <FaCircleXmark
              size={24}
              className='cursor-pointer fill-slate-100 hover:fill-slate-600'
            />
            <span>Stäng</span>
          </>
        ) : (
          <>
            <FaCirclePlus
              size={24}
              className='cursor-pointer fill-slate-100 hover:fill-slate-200'
            />
            <span>Lägg till önskning</span>
          </>
        )}
      </Button>

      {showNewItemForm && (
        <ListItemForm onSave={handleNewItemSubmit} editMode={true} />
      )}

      <hr className='mt-8 border border-red-400 opacity-50' />

      <div className='text-center'>
        <DeleteListButton listId={list._id} />
      </div>
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
  await dbConnect();

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
