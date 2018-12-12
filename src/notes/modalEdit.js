import React, { Component } from 'react';
import { Modal, Button, Input, Form, Message } from 'semantic-ui-react'

class ModalNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSaveNote: this.props.onSaveNote,
      onChangeTitle: this.props.onChangeTitle,
      onChangeContent: this.props.onChangeContent,
      onChangeCategory: this.props.onChangeCategory
    }
  }

  openModalState = () => {
    const { father } = this.props;
    father.setState({ modalstate: true })
  }

  closeModalState = () => {
    const { father } = this.props;
    father.setState({ modalstate: false })
  }


  render() {
    const { onSaveNote, onChangeContent, onChangeCategory, emptyFields } = this.state;
    const { father: { state: { modalstate } }, onChangeTitle, obj } = this.props;

    return (

      <Modal open={modalstate} onClose={this.closeModalState} size='mini' trigger={<Button className='editButton' onClick={this.openModalState}>Edit</Button>}>
        <Modal.Header>Edit note</Modal.Header>
        <Modal.Content image>
          <Form>
            <Form.Field>
              <Input value={obj.title} onChange={onChangeTitle} placeholder='title' />
            </Form.Field>
            <Form.Field>
              <Input value={obj.content} onChange={onChangeContent} placeholder='content' />
            </Form.Field>
            <Form.Field>
              <Input value={obj.category} onChange={onChangeCategory} placeholder='category' />
            </Form.Field>
            <Button onClick={onSaveNote}>Save note</Button>
            <Button onClick={this.closeModalState}>cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }

}

export default ModalNote;