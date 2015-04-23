var React = require('react');
var CustomList = require('../react/CustomList.jsx');

var data1 = [ "foo","bar","baz"];

var data2 = [
    {
        id:'foo1',
        title:'foo 1',
    },
    {
        id:'foo2',
        title:'header foo',
        header:true
    },
    {
        id:'foo3',
        title:'foo 3',
    },
    {
        id:'foo4',
        title:'foo 4'
    }
]
var SourceItem = React.createClass({
    render: function() {
        var cn = "fa fa-fw " + this.props.item.icon;
        if(this.props.item.header == true) {
            return <li className='header'>{this.props.item.title}</li>;
        }
        var cn2 = "";
        if(this.props.index == this.props.selectedIndex) {
            cn2 += " selected";
        }
        return (<li  {...this.props} className={cn2} key={this.props.item.id}
            ><i className={cn}></i>{this.props.item.title}</li>);
    }
});


var MainView = React.createClass({
    selectedItem: function(item) {
        console.log("item was selected",item);
    },
    render: function() {
        return <div>
            <CustomList items={data1}/>
            <CustomList items={data2} template={<SourceItem/>}/>
            <CustomList items={data2} template={<SourceItem/>} onSelect={this.selectedItem}/>
        </div>
    }
});

React.render(<MainView/>, document.getElementById('main'));