import React, { Component } from 'react';
import { Modal, Form, Button, Input, Icon, Message } from 'semantic-ui-react'
import { formDataEncode } from '../helpers/formData_helper';

class ModalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            content: '',
            modalState: false,
            emptyFields: true
        }
    }

    onChangeTitle = (e) => {
        this.setState({ title: e.target.value })
    }

    onChangeContent = (e) => {
        this.setState({ content: e.target.value })
    }

    onChangeCategory = (e) => {
        this.setState({ category: e.target.value })
    }

    openModalState = () => {
        this.setState({
            modalState: true
        })
    }

    closeModalState = () => {
        this.setState({
            modalState: false
        })
        this.setState({ 
            emptyFields: 
            true })
    }

    onSaveNote = event => {
        event.preventDefault();
        const { getNotes } = this.props.father;
        const { title, content, category } = this.state;

        //validate empty fields
        if(title.length === 0 || content.length === 0){
            this.setState({
                emptyFields: false
            }) 
        }else{

        let details = {
            'name': title,
            'category': category,
            'content': content
        };


        fetch(`http://localhost:3000/create`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formDataEncode(details)
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                getNotes();
                this.setState({ 
                    modalState: false,
                    title: '',
                    category: '',
                    content: '',
                    emptyFields: true
                 })
            })
        }
    }


    render() {
        const { title, category, content, modalState, emptyFields } = this.state;
        return (
            <Modal open={modalState} onClose={this.closeModalState} size='mini' trigger={
                <Button onClick={this.openModalState} style={{ background: 'none' }}>
                    <Icon style={{ color: '#ffff' }} size='huge' name='add' />
                </Button>}>
                <Modal.Header>create note</Modal.Header>
                <Modal.Content image>
                    <Form>
                        <Form.Field>
                            <Input value={title} onChange={this.onChangeTitle} placeholder='title' />
                        </Form.Field>
                        <Form.Field>
                            <Input value={content} onChange={this.onChangeContent} placeholder='content' />
                        </Form.Field>
                        <Form.Field>
                            <Input value={category} onChange={this.onChangeCategory} placeholder='category' />
                        </Form.Field>
                        <Button onClick={this.onSaveNote}>Save note</Button>
                        <Message hidden = {emptyFields} negative>
                            <Message.Header>Complete the fields</Message.Header>
                        </Message>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

}

export default ModalCreate;