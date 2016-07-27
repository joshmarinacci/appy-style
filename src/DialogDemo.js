/**
 * Created by josh on 7/27/16.
 */
import React, { Component } from 'react';

import './dialog.css';

class DialogDemo extends Component {
    render() {
        return <div className="scrim">
                <div className="dialog">
                    <header>header of dialog</header>
                    <div className="grow">
                        content of my dialog
                    </div>
                    <footer className="children-right">right aligned footer<button>okay</button><button>cancel</button></footer>
                </div>
            </div>
    }
}

export default DialogDemo
