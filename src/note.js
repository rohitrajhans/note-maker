import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default class Note extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit : false,
			bold: false,
			italic: false,
		};
		this.removeNote = this.removeNote.bind(this);
	}

	removeNote() {
		this.props.deleteNote( this.props.index);
	}

	editNote() {
		this.setState( {
			edit : true,
			bold: this.state.bold,
			italic: this.state.italic,
		});
	}

	saveNote() {
		var text = this.refs.noteText.value;
		this.props.updateNote(text, this.props.index);
		this.setState( {
			edit : false,
			bold: this.state.bold,
			italic: this.state.italic,
		});
	}

	noSave() {
		this.setState( {
			edit : false,
			bold: this.state.bold,
			italic: this.state.italic,
		});	
	}

	bold() {
		this.setState( {
			edit: this.state.edit,
			bold: !this.state.bold,
			italic: this.state.italic,
		})
	}

	italic() {
		this.setState( {
			edit: this.state.edit,
			bold: this.state.bold,
			italic: !this.state.italic,
		})
	}

	determineClass() {
		var className = "";
		if( this.state.bold && this.state.italic)
			className = "bold italic";
		else if( this.state.bold )
			className = "bold";
		else if( this.state.italic) 
			className = "italic";
		else className += "note-text";
		return className;
	}

	determineBold() {
		var className = "";
		if( this.state.bold ) 
			className = "btn btn-xs btn-primary col-sm-4 bold";
		else
			className = "btn btn-xs btn-default col-sm-4 bold";
		return className;
	}

	determineItalic() {
		var className = "";
		if( this.state.italic ) 
			className = "btn btn-xs btn-primary col-sm-4 italic";
		else
			className = "btn btn-xs btn-default col-sm-4 italic";
		return className;
	}

	renderNote() {
		
		return (
			<div className = "row col-sm-12 col-lg-12 note-container">
				<div className="col-sm-12"> 
					<p className={this.determineClass()} > {this.props.children} </p> 
				</div>
				<div className="col-sm-12">
					<button onClick={this.editNote.bind(this)} className="btn btn-info" > Edit </button>
					<button onClick={this.removeNote} className="btn btn-danger" > Remove </button>
				</div>
			</div>
		);
	}

	renderText() {
		return (
			<div className = "row col-sm-12 col-lg-12 note-container">
				<div className = "col-sm-12 form-group">
					<label for = "comment"> Edit Note </label>
					<textarea ref="noteText" className="form-control" defaultValue={this.props.children} >
					</textarea> 
				</div>
				<div className = "row col-sm-4">
					<button onClick={this.saveNote.bind(this)} className="btn btn-success" > Save </button>
					<button onClick={this.noSave.bind(this)} className="btn btn-danger" > Don't Save </button>
				</div>
				<div className = "row col-sm-4">
					<button onClick={this.bold.bind(this)} className={this.determineBold()}> B </button>
					<button onClick={this.italic.bind(this)} className={this.determineItalic()}> I </button>
				</div>
			</div>
		);
	}

	render() {
		if( this.state.edit) {
			return (
				this.renderText()
			)
		}
		else {
		 return (
				this.renderNote()
			)
		}
	}
} 