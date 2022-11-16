// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { idText } from 'typescript';

type Data = {
  name: string,
  error: string,
  success: boolean,
}

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    return await addBook(req, res);
  }
  else if (req.method === 'GET') {
    return await readBooks(req, res);
  } else if (req.method === 'DELETE') {
    console.log("hallo", req.method)
    return await deleteBook(req, res);
    // return res.status(200).json({message:"Deleting.."});
  }
  else {
    console.log("response 405 - method not allowed - success false")
    return res.status(405).json({message:"Method not allowed", success: false});
  }
}
async function deleteBook(req: NextApiRequest, res: NextApiResponse) {
  const body = req.query;
  console.log(body)
  try{
    console.log("JULLA")
    console.log(res)
    console.log(body)
    const deleteBook = await prisma.bookSuggestion.delete({
      where: {
        id: 51
       }
    })
    console.log(deleteBook)
    console.log("Trying to delete")
    return res.status(200).json(deleteBook);
  } catch (error){
    console.log(error)
    res.status(500).json({error: body, success: false},)

  }
}

async function readBooks(req: NextApiRequest, res:NextApiResponse) {
  try{
    const allBooks = await prisma.bookSuggestion.findMany();
    console.log("Success: true")
    return res.status(200).json(allBooks);
  } catch (error){
    console.log(error)
    res.status(500).json({error: "Error reading from database", success: false})
  }
}
async function addBook(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try{
    const newEntry = await prisma.bookSuggestion.create({
      data:{
        bookTitle: body.bookTitle,
        bookAuthor: body.bookAuthor,
        bookGenre: body.bookGenre,
      }
    });
    console.log("response 200 ok, success: true")
    return res.status(200).json(newEntry)
    // return res.status(200).json()
  } catch(error) {
    console.error("Request error", error);
    res.status(500).json({error:"error adding book", success:false});
  }
}