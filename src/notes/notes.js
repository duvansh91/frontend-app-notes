import React, { Component } from 'react';
import '../assets/App.css';
import Note from '../notes/note';
import { Container, Segment, Message, Input, Menu, Icon } from 'semantic-ui-react'
import ModalCreate from '../notes/modalCreate';
import 'semantic-ui-css/semantic.min.css';



class Notes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      activeItem: 'home',
      search: ''
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this.getNotes()
  }


  getNotes = () => {
    fetch('http://localhost:3000/showAll')
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value.substr(0, 20) });
  }


  render() {

    let filteredNotes = this.state.notes.filter(
      (note) => {
        return note.name.indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    const { notes, activeItem } = this.state;

    return (

      <Container className="mainContainer">

        <Container className="midContainer">

          <ModalCreate father={this} />
          <Segment.Group className="segmentNotes">
            <Container className="menuContainer">
            <Menu className="searchMenu" vertical>
              <Menu.Item>
                <Input placeholder='Search'
                  value={this.state.search}
                  onChange={this.updateSearch}
                />
              </Menu.Item>

              <Menu.Item>
                Home
          <Menu.Menu>
                  <Menu.Item
                    name='search'
                    active={activeItem === 'search'}
                    onClick={this.handleItemClick}
                  >
                    Search
            </Menu.Item>
              
                </Menu.Menu>
              </Menu.Item>

              
            </Menu>
            </Container>


            <Container className="notesContainer">
            {
              notes.length > 0 ?
                (filteredNotes.map(note =>
                  <Note
                    key={note.id}
                    id={note.id}
                    className='note'
                    title={note.name}
                    content={note.content}
                    category={note.category}
                    father={this}
                  />
                )) : (
                  <Message
                    className="emptyMessage"
                    size='large'
                    icon='pencil'
                    header='Write a new note'
                  />
                )
            }
            </Container>
          </Segment.Group>
        </Container>
      </Container>


    );
  }
}

export default Notes;