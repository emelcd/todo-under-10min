import "./App.css";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isImport, setImport] = useState(false);
  const objNote = {
    id: 1,
    text: "",
    type: "note",
  };

  const handlerText = (event) => {
    const text = event.target.value;
    if (event.keyCode === 13) {
      setNotes([...notes, text]);
      localStorage.setItem("notes", JSON.stringify([...notes, text]));
      event.target.value = "";
    }
  };

  const removeItem = (e) => {
    console.log(e.target.id);
    console.log(notes[e.target.id]);
    setNotes(
      notes.filter((item, index) => {
        return index != e.target.id ? item : null;
      })
    );
    localStorage.setItem(
      "notes",
      JSON.stringify(
        notes.filter((item, index) => {
          return index != e.target.id ? item : null;
        })
      )
    );
  };

  const Note = ({ id, text }) => (
    <div className="note" key={id}>
      <Container style={{ display: "flex", justifyContent: "space-between" }}>
        <b>Note #{id}</b>
        <b
          onClick={(e) => {
            removeItem(e);
          }}
          id={id}
          style={{ color: "red", cursor: "pointer", fontSize: "1rem" }}
        >
          X
        </b>
      </Container>
      <hr></hr>
      {text}
    </div>
  );

  const toDoNotes = notes.map((note, index) => {
    return (
      <div className="notes" key={index}>
        <Note id={index} text={note} />
      </div>
    );
  });

  const removeNotes = () => {
    setNotes([]);
    localStorage.removeItem("notes");
  };

  const createBlob = () => {
    const blob = new Blob([JSON.stringify(notes)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    // save blob to a file
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const GravitySelector = () => {
    return (
      <Container>
        <div>
          <h3>NoteApp</h3>
        </div>
      </Container>
    );
  };

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, [setNotes]);

  return (
    <div className="App">
      <header className="App-header">
        <GravitySelector />
        <input
          className="input-text"
          type="text"
          onKeyDown={handlerText}
        ></input>
        <div>
          <Button
            variant="contained"
            color="primary"
            className="App-btn"
            onClick={removeNotes}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="App-btn"
            onClick={createBlob}
          >
            Enviar
          </Button>
        </div>
        <div className="notes-container">{toDoNotes}</div>
      </header>
    </div>
  );
};

export default App;
