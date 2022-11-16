// import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
// import { games } from "../data/paths";
import { useState  } from "react";
import { useEffect } from "react";

export default function Home() {
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <h1>Loading..</h1>;
  // }
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [APIResponse, setAPIResponse] = useState(null);

  useEffect(() => {
    // console.log("bookTitle", bookTitle);
    // console.log("bookAuthor", bookAuthor);
    // console.log("bookGenre", bookGenre);
    console.log("API Response", APIResponse);
  },[bookTitle, bookAuthor, bookGenre, APIResponse])

const deleteBooks = async () => {

  try{
    const response = await fetch(`/api/books`, {
      method: "DELETE",
      headers: {"Content-Tyoe": "application/json"},
    });
    setAPIResponse(await response.json());
    console.log("RESPONSY", response)
    if (response.status != 200){
      console.log("Something went wrong");
    } else {
      console.log("books deleted successfully !!!")
    }
  }catch(error){
    console.log("There was an error deleting from the DB", error)
  }
}

const readDB = async() => {
  try{
    const response = await fetch("/api/books", {
      method: "GET",
      headers: {"Content-Tyoe": "application/json"},
    });
    setAPIResponse(await response.json());
    if (response.status != 200){
      console.log("Something went wrong");
    } else {
      console.log("form submitted successfully !!!")
    }
  } catch(error){
    console.log("There was an error reading from the DB", error)
  }
}

const handleSubmit = async(e:any): Promise<any> => {
  e.preventDefault();
  const body = {bookTitle, bookAuthor, bookGenre}
  try{
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status != 200){
      console.log("Something went wrong");
    } else {
      resetForm();
      readDB();
      console.log("form submitted successfully !!!")
    }
  } catch (error) {
    console.log("there was an error submitting", error)
  }
}

const resetForm = () => {
  setBookTitle("");
  setBookAuthor("");
  setBookGenre("");
}

  return (
    <>
      <section className="w-full grid grid-cols-2 grid-rows-auto gap-2">
              <div className="flex w-full h-64 bg-slate-200 dark:bg-dark rounded-md items-center justify-center">
                <div className="flex gap-x-4 p-4 items-center">
                  <div className="w-10 h-10 rounded-md bg-slate-300 dark:bg-light"></div>
                  <h2 className="heading-2">Book</h2>
                  <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="book-title" className="mt-2 block">
                      Book Title
                    </label>
                    <input 
                      onChange={(e) => setBookTitle(e.target.value)}
                      type="text"
                      name="book-title"
                      id="book-title"
                      autoComplete="given-name"
                      className="border-gray-600"/>
                      <label htmlFor="author-name" className="mt-2 block">
                      Author Name
                    </label>
                    <input 
                      onChange={(e) => setBookAuthor(e.target.value)}
                      type="text"
                      name="author-name"
                      id="author-name"
                      autoComplete="family-name"
                      className="border-gray-600"/>
                      <label htmlFor="genre" className="mt-2 block">
                      Genre
                    </label>
                    <input 
                      onChange={(e) => setBookGenre(e.target.value)}
                      type="text"
                      name="genre"
                      id="genre"
                      autoComplete="organization"
                      className=""/>
                    <input
                      type="submit"
                      value="Submit"
                      className="hover:text-red-600"/>
                  </form>
                </div>
                <div>{
                  APIResponse?.map((book, i) => (
                 
                      <li key={i}>
                        {book.id} 
                      <button onClick={() => deleteBooks()}>
                        {book.bookTitle}
                      </button>
                      </li>
                      
                
                  ))
                  }
                </div>
              </div>
      </section>

      {/* {session ? (
        
        <p>Signed in as {session.user?.name} with {session.user?.email}</p>
      ) : (
        <p>Not signed in</p>
      )} */}
    </>
  );
}
