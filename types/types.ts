import { NextApiRequest } from 'next';

export type ListItem = {
  _id: string;
  title: string;
  link?: string;
  description?: string;
};

export interface RequestWithBody<T = any> extends NextApiRequest {
  body: T;
}

export type ListCreateData = {
  title: string;
  items: ListItem[];
  ownerId: string;
  ownerEmail: string;
};

export type List = {
  _id: string;
  title: string;
  owner: string;
  owner_username?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  items: ListItem[];
};
