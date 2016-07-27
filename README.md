# appy-style
CSS framework for desktop web-apps


# styles

The style `layout.css` contains the common layout styles, especially the flexbox styles.  To create 
an iTunes like interface with an action bar, a scrolling sidebar with a list of sources, and a primary table view,
and a status bar; use a nested set of hboxes and vboxes like this:
 
 ``` html
 <div class='fill vbox'>
 
    <!-- action bar -->
    <div class='hbox'> 
       <button>play</button>
       <label>song name</label> 
       <span class='grow'></span> <!-- spacer -->
       <input type='search' placeholder='search for songs'/>
    </div>
        
    <!-- the middle section -->
    <div class='hbox'> 
        <!-- sources pane -->
        <div class='vbox'>
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
        
        <!-- main table view -->
        <div class='grow scroll'>
            <table>
                <tbody>
                    .... table of songs
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- the status bar -->
    <div class='hbox'>
       <label>Songs in library: 23,000</label>
   </div>
   
</div>
```

Primary layout classes:

* `hbox` creates a horizontal box. By default everything is aligned to the left
* `vbox` creates a vertical box. by default everything is aligned to the top
* `grow` makes the element take up all extra space from it's siblings.  ex: list takes up all space, but header and footer are still visible. ex: toolbar with invisible spacers to take up extra space and force some buttons to the right.
* `scroll` makes the element scroll it's content. if you want to have a scrolling list, put `scroll` on the *parent* container of the list.
* `fill` makes the element be absolutely positioned and take all space. Generally used only for the top level container.
* `debug` gives the element a 1px red border
* `hidden` sets display none. good for conditionally hiding elements.

You can make a great number of layouts with just these basics.

    
       
    