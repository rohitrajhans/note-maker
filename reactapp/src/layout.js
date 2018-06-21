import React from 'react';
import Note from './note.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			comments : [
				'Sample Note',
			],
		};
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.add = this.add.bind(this);
	}

	componentDidMount() {
		fetch('/api/notes')
			.then( res => res.json())
			.then( notes => console.log(notes));
	}

	edit(text, index){
		var arr = this.state.comments;
		arr[index] = text;
		this.setState( {
			comments: arr,
		})
	}

	remove(index){
		var arr = this.state.comments;
		arr.splice(index, 1);
		this.setState( {
			comments: arr,
		})
	}

	add(){
		var arr = this.state.comments;
		arr.unshift("empty note");
		this.setState( {
			comments: arr,
		})
	}

	render() {
		return (
			<div className="container"> 
				<button className="add btn btn-primary" onClick ={this.add.bind(this)}> Add </button>
				{ 
					this.state.comments.map ( ( text, i ) => {
						return( 
							<Note 
								key={i}
								index = {i}
								addNote = {this.add}
								deleteNote = {this.remove}
								updateNote = {this.edit} > 
							{text}
						 	</Note> )
					})
				}
			</div>
		);
	}
}