import { NextApiRequest } from "next"

export type ListItem = {
  title: string
  link?: string
  description?: string
}

export interface RequestWithBody<T = any> extends NextApiRequest {
  body: T
}

export type ListCreateData = {
  title: string
  items: ListItem[]
  ownerId: string
  ownerEmail: string
}

export type List = {
  id: string
  title: string
  ownerId: string
  ownerEmail: string
  entered: Date | string
  items: ListItem[]
}
