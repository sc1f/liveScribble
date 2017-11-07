import React, {Component} from 'react';

export default class extends Component {
    render() {
        return (
            <div>
                <p className="user__header">editing this scribble:</p>
                <div className="users">
                    <div className="user">
                        <p className="user__name">JT</p>
                    </div>
                    <div className="user">
                        <p className="user__name">FS</p>
                    </div>
                </div>
            </div>
        )
    }
}