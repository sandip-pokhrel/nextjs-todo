import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { API } from "../utils/axios";
import { AxiosResponse } from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// TODO: make a popup component to display the starship's Name
// use star wars people API to get the list of People which when clicked gives a list of starships they have

interface ITodo {
  title: string;
  id: string;
  isCompleted: boolean;
}

interface SWPlanet {
  climate: string;
  diameter: number;
  gravity: string;
  name: string;
  orbital_period: number;
  population: number;
  residents: string[];
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
}

interface WrappedPlanets {
  count: number;
  next: string;
  prev: string;
  results: SWPlanet[];
}

interface People {
  name: string;
  starships: Starships[];
}

interface SWPeoples {
  count: number;
  next: string;
  prev: string;
  results: People[];
}

interface Starships {
  name: string;
  manufacturer: string;
  pilots: string[];
}

interface SWStarships {
  count: number;
  next: string;
  prev: string;
  results: Starships[];
}

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState("");
  const [planets, setPlanets] = useState<SWPlanet[]>([]);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<People[]>([]);
  const [starship, setStarships] = useState<Starships[]>([]);

  const sortedTodos = todos.sort((a) => (a.isCompleted ? 1 : -1));
  const [animationParent] = useAutoAnimate();

  // const fetchPlanets = async () => {
  //   try {
  //     setLoading(true);
  //     const planets3: AxiosResponse<WrappedPlanets> = await API.get("planets/");
  //     setPlanets(planets3.data.results);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchPlanets();
  // }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const allpeople: AxiosResponse<SWPeoples> = await API.get("people/");
      setPeople(allpeople.data.results);
      console.log(allpeople.data.results);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPeople();
  }, []);

  // const fetchStarships = async () => {
  //   try {
  //     setLoading(true);
  //     const allStarships: AxiosResponse<SWStarships> = await API.get(
  //       "starships/"
  //     );
  //     setStarships(allStarships.data.results);
  //     console.log(allStarships.data.results);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchStarships();
  // }, []);

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
      <div ref={animationParent}>
        {sortedTodos.map((eachTodo) => (
          <div
            style={{
              color: eachTodo.isCompleted ? "red" : "white",
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
      </div>
      {/* <div>
        <p>Climates are:</p>
        {loading
          ? "loading...."
          : planets.map((planet) => {
              return planet.climate.includes("temperate") ? (
                <div>{planet.name}</div>
              ) : null;
            })}
      </div>
      <br /> */}
      <div>
        <h2>Available Peoples:</h2>
        <br />
        {loading
          ? "loading...."
          : people.map((people, index) => {
              return (
                <div key={index}>
                  <button onClick={() => {}}>{people.name}</button>
                </div>
              );
            })}
      </div>
      <br />
      {/* <div>
        <h2>Available Starships:</h2>
        <br />
        {starship.map((ships) => {
          return (
            <div>
              <button>{ships.name}</button>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
