import React, { Component } from 'react';
import { Card, Icon, Header, Confirm } from 'semantic-ui-react';
import ModalNote from '../notes/modalEdit';
import { formDataEncode } from '../helpers/formData_helper';

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            content: this.props.content,
            category: this.props.category,
            className: this.props.className,
            modalstate: false,
            confirmstate: false
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


    onSaveNote = event => {
        event.preventDefault();
        const { title, id, content, category } = this.state;

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


        fetch(`http://localhost:3000/update/${id}`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formDataEncode(details)
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({ modalstate: false })

            })
        }
    }

    closeConfirm = () => {
        this.setState({
            confirmstate: false
        })
    }

    deleteNote = () => {
        const { id } = this.state;

        fetch(`http://localhost:3000/delete/${id}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.props.father.getNotes()
                this.closeConfirm();
            })
            .catch(err => console.log(err))
    }

    render() {
        const { title, content, category, className, confirmstate } = this.state;
        console.log(title)
        return (
            <Card className={className}>
                <Card.Content>
                    <Icon onClick={() => this.setState({ confirmstate: true })} className='iconDelete' color='red' size='large' name='delete' />
                    <Confirm
                        open={confirmstate}
                        size='tiny'
                        onCancel={this.closeConfirm}
                        onConfirm={this.deleteNote}
                        content='¿Are you sure?' />
                    <Header>
                        {title}
                    </Header>
                </Card.Content>
                <Card.Content description={content} />
                <Card.Content extra>
                    <Icon name='user' />
                    {category}
                    <ModalNote
                        onChangeTitle={this.onChangeTitle}
                        onChangeContent={this.onChangeContent}
                        onChangeCategory={this.onChangeCategory}
                        obj={this.state}
                        onSaveNote={this.onSaveNote}
                        father={this}
                    />
                </Card.Content>
            </Card>
        )
    }
}

export default Note