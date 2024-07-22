import { useState, useEffect } from "react";

import "../assets/track.css";
import Player from "./Player";

export default function List() {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("default");
  const [author, setAuthor] = useState("default");
  const [image, setImage] = useState("default");
  const [id, setId] = useState("");

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch("http://localhost:8080/api/v1/")).json();

      setItems(data);
    };
    dataFetch();
  }, []);

  const setInfoToPlayer = (song) => {
    setName(song.name);
    setAuthor(song.author);
    setImage(getUrlImage(song.id));
    setId(song.id);
  };

  // иногда отправляется на оба трека одна и та же обложка
  // либо не принимается вообще обложка
  // временное решение пока???

  // отправка в плеер инфы
  const list = items.map((song) => (
    <>
      <div className="TrackBox">
        <div className="buttonPlay">
          <button onClick={() => setInfoToPlayer(song)}>
            <img src={getUrlImage(song.id)} decoding="async" />
          </button>
        </div>
        <div>
          <ul>
            <p>{song.name}</p>
            <p>{song.author}</p>
          </ul>
        </div>
      </div>
    </>
  ));

  return (
    <>
      {list}
      <Player
        song={{
          name: name,
          author: author,
          image: image,
          id: id,
        }}
      />
    </>
  );

  function getUrlImage(id) {
    return "http://localhost:8080/api/v1/image/" + id;
  }
}
