import React, { Component } from 'react'

class PostForm extends Component {
    state = {
        name: '',
        email: '',
        comment: ''
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    handleChange = ({target}) => {
        this.setState({[target.name] : target.value});
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        fetch('https://formula-test-api.herokuapp.com/contact', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            alert('Success: ' + JSON.stringify(response));
            this.props.history.push('/');
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        const {name, email, comment} = this.state;
        return (
            <section className="contact" ref={el => { this.el = el }}>
                <div className='container'>
                    <h1 className='contact__title'>Contact us</h1>
                    <form onSubmit={this.handlerSubmit} className='form'>
                        <div>
                            <input type="text" className="form-control" id="name" name='name' placeholder="Enter User name" value={name} onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <input type="email" className="form-control" name="email" placeholder="Enter Email" value={email} onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <textarea name="comment" className="form-control" placeholder='Leave your comment'  cols="30" rows="10" value={comment} onChange={this.handleChange}></textarea>
                        </div>
                        <button type="submit" className="form__button button">Submit</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default PostForm
