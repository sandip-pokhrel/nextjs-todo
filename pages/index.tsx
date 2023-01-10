import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useState } from "react";

interface ITodo {
  title: string;
  id: string;
  isCompleted: boolean;
}
// todofortomorrow
// Completed todos at last
// Display picture in each todo

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState("");

  const sortedTodos = todos.sort(a => a.isCompleted ? 1 : -1);
  return (
    <>
      <Head>
        <title>Sandip</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Todo</h1>
      <label>Task</label>
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <br />
      <label>Image URL</label>

      <br />
      <button
        onClick={() => {
          if (!title) return;
          setTodos([
            ...todos,
            {
              title: title,
              isCompleted: false,
              id: Math.random().toString(),
            },
          ]);
          setTitle("");
        }}
      >
        Save
      </button>
      <br />
      <br />
      {sortedTodos.map((eachTodo) => (
        <div
          style={{
            color: eachTodo.isCompleted ? "red" : "black",
          }}
          key={eachTodo.id}
        >
          <h3>{eachTodo.title}</h3>

          <button
            onClick={() => {
              const changedTodos = todos.map((item) => {
                return {
                  ...item,
                  isCompleted:
                    eachTodo.id === item.id
                      ? !item.isCompleted
                      : item.isCompleted,
                };
              });
              setTodos(changedTodos);
            }}
          >
            Completed
          </button>
          <button
            onClick={() => {
              const filteredTodos = todos.filter((item) => {
                return eachTodo.id !== item.id;
              });
              setTodos(filteredTodos);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
