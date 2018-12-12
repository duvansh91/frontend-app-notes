import React, { Component } from 'react';
import '../App.css';
import Note from '../notes/note';
import { Container, Segment } from 'semantic-ui-react'
import ModalCreate from '../notes/modalCreate';
import 'semantic-ui-css/semantic.min.css';


class Notes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes =() =>{
    fetch('http://localhost:3000/showAll')
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
  }

 
  render() {
    return (
      <Container className="mainContainer">
        <h1>Notes</h1>
        <Segment.Group>
          {this.state.notes.map((note, key) =>
            <Note
              key={key}
              id={note.id}
              className='note'
              title={note.name}
              content={note.content}
              category={note.category}
              father={this}
            />)
          }
        </Segment.Group>
        <ModalCreate father={this} />
      </Container>
    );
  }
}

export default Notes;