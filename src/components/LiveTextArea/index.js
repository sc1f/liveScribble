import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

export default class LiveTextArea extends Component {
    constructor(props) {
        // always use constructor to create state for instance
        super(props);
        this.state = {
            content: 'write something/anything/whatever'
            //last_edit_time: null,
            //open_time: null
        };
        //this.handleOnChange = this.handleOnChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        /*
        this.setState({
            last_save_time: null,
            open_time: Date.now(),
            show_save: false
        }); */
        this.focusTextArea();
        this._handleEditEvent();
    }

    handleKeyDown(event) {
        //if(!event.ctrlKey || !event.metaKey) return false;

        let charCode = String.fromCharCode(event.which).toLowerCase();

        if ((event.ctrlKey && charCode === 's') || (event.metaKey && charCode === 's')) {
            event.preventDefault();
            this.setState({
                last_save_time: Date.now(),
                show_save: true
            });

            setTimeout(function (self) {
                self.state.show_save = false;
            }, 3000, this);
        }
    }

    handleSelect(event) {
        let textarea = this.textarea_main;
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        if (start === end) {
            socket.emit('cursor moved', {
                position: start,
                edit_time: Date.now(),
                user: 'jt123'
            });
        } else {
            socket.emit('select', {
                start: start,
                end: end,
                edit_time: Date.now(),
                user: 'jt123'
            });
        }

    }

    focusTextArea() {
        this.textarea_main.focus();
    }

    handleInput(event) {
        socket.emit('edit', {
            content: event.target.value,
            edit_time: Date.now(),
            user: 'jt123'
        });
    }

    _handleEditEvent() {
        socket.on('edit', (content) => {
            this.props.newEdit({
                user: content.user,
                edit_time: content.edit_time,

            });
        });
    }

    /*
    handleOnChange() {

    }*/

    render() {
        return (
            <div>
                <textarea name="textarea-main"
                          id="textarea-main"
                          placeholder="write something/anything/whatever"
                          autoFocus
                          onChange={this.handleInput}
                          content={this.content}
                          value={this.state.value}
                          onMouseUp={this.handleSelect}
                    //onKeyDown={ this.handleKeyDown }
                          ref={(textarea_main) => {
                              this.textarea_main = textarea_main;
                          }}>
                </textarea>
                {this.state.show_save ? <p>last saved at {this.state.last_save_time} </p> : ""}
            </div>
        )
    }
}