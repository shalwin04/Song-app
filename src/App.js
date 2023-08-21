import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import SongsCard from "./SongsCard";

const API_KEY = "120fe362f5cc69c9bc1e3a219fba26d7";
const API_URL = "http://ws.audioscrobbler.com/2.0/";
const TAG_API_URL =
  "http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=disco&api_key=" +
  API_KEY +
  "&format=json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    searchSongs("Lover");
  }, []);

  useEffect(() => {
    fetchSongInfo("Lover");
  }, []);

  const searchSongs = async (title) => {
    try {
      const response = await fetch(
        `${API_URL}?method=track.search&track=${title}&api_key=${API_KEY}&format=json`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (
        data &&
        data.results &&
        data.results.trackmatches &&
        data.results.trackmatches.track
      ) {
        setSongs(data.results.trackmatches.track);
      } else {
        console.log("No matching songs found.");
        setSongs([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSongs([]);
    }
  };

  const fetchSongInfo = async (title) => {
    try {
      const response = await fetch(TAG_API_URL);
      const data = await response.json();
      console.log(data);
      setSongInfo(data);
    } catch (error) {
      console.log("Error fechting info :", error);
    }
  };

  return (
    <div className="app">
      <h1>Safe and Sound</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for songs"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchSongs(searchTerm)}
        />
      </div>

      {songs?.length > 0 ? (
        <div className="container">
          {songs.map((song) => (
            <SongsCard song={song} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>
            Sorry !! The song you are currently looking for is not availabe !!
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
