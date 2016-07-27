import React, { Component } from 'react';
import './layout.css';

class App extends Component {
  render() {
    return (
        <div className='fill vbox debug'>
            <div className='hbox'>
                <button>play</button>
                <label>song name</label>
                <span className='grow'></span>
                <input type='search' placeholder='search for songs'/>
            </div>


            <div className='hbox debug grow'>
                <div className='vbox'>
                    <h3>sources</h3>
                    <div class='scroll grow'>
                        <ul>
                            <li>All songs</li>
                            <li>Artists</li>
                            <li>Albums</li>
                            <li>Genres</li>
                        </ul>
                    </div>
                </div>

                <div className='grow scroll'>
                    <table>
                        <tbody>
                        .... table of songs
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='hbox'>
                <label>Songs in library: 23,000</label>
            </div>

        </div>
    );
  }
}

export default App;
