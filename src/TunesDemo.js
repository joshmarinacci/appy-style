import React, { Component } from 'react';


function range(start,stop) {
    var ret = [];
    for(var i=start; i<stop; i++) {
        ret.push(i)
    }
    return ret;
}
class TunesDemo extends Component {
    render() {
        var songs = range(0,50).map((i)=> String.fromCharCode('A'.charCodeAt(0)+i));
        return (
            <div className='fill vbox'>
                <div className='hbox toolbar'>
                    <button>play</button>
                    <label>song name</label>
                    <span className='grow'></span>
                    <input type='search' placeholder='search for songs'/>
                </div>


                <div className='hbox grow'>
                    <div className='vbox left-pane'>
                        <h3>Sources</h3>
                        <div class='scroll grow'>
                            <ul>
                                <li>All songs</li>
                                <li>Artists</li>
                                <li>Albums</li>
                                <li>Genres</li>
                            </ul>
                        </div>
                    </div>

                    <div className='grow scroll vbox form'>
                        <h3>Form at the top</h3>

                        <div className="hbox">
                            <label>Basic buttons</label>
                            <button>do stuff</button>
                            <button>do more stuff</button>
                        </div>
                        <div className="hbox">
                            <label>Checkbox</label>
                            <input type="checkbox"/>
                            <label>enabled</label>
                        </div>
                        <div className="hbox">
                            <label>Radio Buttons</label>
                            <input type="radio"/><label>Yes</label>
                            <input type="radio"/><label>No</label>
                            <input type="radio"/><label>Maybe</label>
                        </div>
                        <div className="hbox">
                            <label>group of toggle buttons</label>
                            <div className="group">
                                <button>do stuff</button>
                                <button>do more stuff</button>
                                <button className="selected">selected stuff</button>
                            </div>
                        </div>
                        <div className="hbox">
                            <label>input</label>
                            <input type="text" size="20" placeholder="username"/>
                            <input type="password" size="10" placeholder="password"/>
                        </div>
                        <div className="hbox">
                            <label>right aligned w/ primary button</label>
                            <button>Cancel</button>
                            <button className="primary">Okay</button>
                        </div>

                        <h3>a table</h3>
                        <table className="songs-table">
                            <thead>
                            <tr><th>Number</th><th>Value 1</th><th>Value 2</th></tr>
                            </thead>
                            <tbody>{songs.map((t,i)=>{
                                return <tr><td>{i}</td><td>{t}</td><td>{t}</td></tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='hbox statusbar'>
                    <label>Songs in library: 23,000</label>
                </div>

            </div>
        );
    }
}

export default TunesDemo;