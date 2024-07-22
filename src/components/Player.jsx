import { useState } from "react";
import "../assets/player.css";
import { IconContext } from "react-icons";
import {
  AiFillPlayCircle,
  AiFillRightCircle,
  AiFillLeftCircle,
  AiFillPauseCircle,
} from "react-icons/ai";
import { FaShuffle } from "react-icons/fa6";

// song -> InfoSongs
// current song
// all song []
//

function Player({ song }) {
  var audioPlayer = document.getElementById("AUDIOPLAYER");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIconPause, setIsIconPause] = useState(false);

  const pauseTrack = () => {
    // название другое?
    if (!isPlaying) {
      audioPlayer.play();
      setIsPlaying(true);

      setIsIconPause(true);
    } else {
      audioPlayer.pause();
      setIsPlaying(false);

      setIsIconPause(false);
    }
  };

  const changeIcon = () => {
    if (!isIconPause) {
      return <AiFillPlayCircle />;
    } else {
      return <AiFillPauseCircle />;
    }
  };

  return (
    <div className="player">
      <div className="imageText">
        <img src={song.image} />
        <ul>
          <p>{song.name}</p>
          <p>{song.author}</p>
        </ul>
      </div>
      <div className="actionButtons">
        <button>
          <IconContext.Provider value={{ size: "3em", color: "#0000000" }}>
            <FaShuffle />
          </IconContext.Provider>
        </button>
        <button>
          <IconContext.Provider value={{ size: "3em" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        </button>
        <button className="playButton" onClick={() => pauseTrack()}>
          <IconContext.Provider value={{ size: "3em" }}>
            {changeIcon()}
          </IconContext.Provider>
        </button>
        <button>
          <IconContext.Provider value={{ size: "3em" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        </button>
      </div>

      <audio src={getAudio(song.id)} id="AUDIOPLAYER" />
    </div>
  );
  // controls="true"
}

function getAudio(id) {
  return "http://localhost:8080/api/v1/songs/" + id;
}

export default Player;
