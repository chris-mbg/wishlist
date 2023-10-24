import ListModel from '@/models/List';
import dbConnect from '../dbConnect';
import { List } from '@/types/types';

export async function getOneList(listId: string) {
  let result: List | null = null;
  let error: unknown | null = null;

  try {
    await dbConnect();
    result = await ListModel.findById(listId).populate('items').exec();
  } catch (err) {
    error = err;
  }

  return { result, error };
}

export async function getAllLists() {
  let result: List[] | null = null;
  let error: unknown | null = null;

  try {
    await dbConnect();
    result = await ListModel.find({}).populate('items').exec();
  } catch (err) {
    error = err;
  }

  return { result, error };
}