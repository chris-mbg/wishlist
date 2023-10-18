import bcrypt from "bcryptjs";
import dbConnect from '@/utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'
import User from "@/models/User";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
    if(req.method !== 'POST') {
      return
    }

    const { userName, email, password } = req.body;

    await dbConnect();
    const SALT_ROUNDS = 12

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({ message: 'User created'})
  } catch (err: any) {
    return res.status(500).json({message: err.message || 'Could not save user'})
  }
}

