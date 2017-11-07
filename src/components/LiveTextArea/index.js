import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
        // always use constructor to create state for instance
        super(props);
        this.state = {
            value: "",
            last_edit_time: null,
            open_time: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.setState({
            last_save_time: null,
            open_time: Date.now(),
            show_save: false
        });
        this.focusTextArea();
    }

    handleKeyDown(event) {
        //if(!event.ctrlKey || !event.metaKey) return false;

        let charCode = String.fromCharCode(event.which).toLowerCase();

        if((event.ctrlKey && charCode === 's') || (event.metaKey && charCode === 's')) {
            event.preventDefault();
            this.setState({
                last_save_time: Date.now(),
                show_save: true
            });

            setTimeout(function(self) {
                self.state.show_save = false;
            }, 3000, this);
        }
    }

    hideSave() {
        this.setState({
            show_save: false
        });
    }

    focusTextArea() {
        this.textarea_main.focus();
    }

    handleInput() {
        this.setState({

        });
    }

    render() {
        return(
            <div>
                <textarea name="textarea-main"
                          id="textarea-main"
                          placeholder="write something/anything/whatever"
                          autoFocus
                          onChange={ this.handleInput }
                          //onKeyDown={ this.handleKeyDown }
                          ref={(textarea_main) => { this.textarea_main = textarea_main; }}>
                </textarea>
                { this.state.show_save ? <p>last saved at { this.state.last_save_time } </p> : "" }
            </div>
        )
    }
}