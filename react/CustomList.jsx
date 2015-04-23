/*

 This is a customizable list component.  To use the defaults, just set the items property
 to an array of objects. Each item will be rendered using that item's toString() function.
 This allows you to customize the formatting of the list element.

 If you need to do something more complex, like add buttons or custom layout to each item,
 then set the template property to a custom React component. This component
 will be copied for each item, and given an item property.  example:

 // lets draw list items with font awesome icons.

 var items = [
 {text:'foo', 'fa fa-star'},
 {text:'bar', 'fa fa-check'}
 ];

 var IconItemTemplate = React.createClass({
 render: function() {
 return <li {...this.props}>{this.props.item.text}
 <i className={this.props.item.iconClass}></i></li>
 }
 });

 <CustomList items={items} prototype={<IconItemTemplate/>} />

 To let the user rearrange the items by dragging, set the HTML 5 draggable property
 to true in your template.

 */

var React = require('react');
//var ListModel = require('./ListModel');

var DefaultItemTemplate = React.createClass({
    render: function() {
        return <li draggable='true' {...this.props}>{this.props.item.toString()}</li>
    }
});

var ListItem = React.createClass({
    getInitialState: function() {
        return {
            dragging: false
        }
    },
    clicked: function(e) {
        e.preventDefault();
        this.props.setSelected(this.props.index);
    },
    dragStart: function(e) {
        e.dataTransfer.setData('text/plain', this.props.item.id);
        this.setState({
            dragging:true
        });
    },
    dragOver: function(e) {
        e.preventDefault();
        var rect = this.refs.item.getDOMNode().getBoundingClientRect();
        this.props.parentDragOver({
            item: this.props.item,
            clientX:e.clientX,
            clientY:e.clientY,
            bounds: rect
        });
    },
    dragEnd: function(e) {
        e.preventDefault();
    },
    drop: function(e) {
        var rect = this.refs.item.getDOMNode().getBoundingClientRect();
        this.props.parentDrop({
            itemid: e.dataTransfer.getData('text/plain'),
            clientX:e.clientX,
            clientY:e.clientY,
            bounds: rect,
            dropid: this.props.item.id
        });
    },
    render: function() {
        var cn = "";
        if(this.props.index == this.props.selectedIndex) {
            cn += " selected";
        }
        if(this.props.dropTarget == this.props.item) {
            if(this.props.dropY <= 30) {
                cn += ' drop-target-top';
            } else {
                cn += ' drop-target-bottom';
            }
        }

        var temp = <DefaultItemTemplate/>
        if(this.props.template) temp = this.props.template;
        return React.cloneElement(temp, {
            ref:'item',
            tabIndex:"1",
            item: this.props.item,
            index: this.props.index,
            selectedIndex: this.props.selectedIndex,
            setSelected: this.props.setSelected,
            onDragStart:this.dragStart,
            onDragEnd:this.dragEnd,
            onDragOver: this.dragOver,
            onDrop:this.drop,
            parentDragOver: this.props.parentDragOver,
            dropTarget: this.props.dropTarget,
            dropY: this.props.dropY,
            parentDrop: this.props.parentDrop,
            onClick: this.clicked,
            className:cn
        });
    }
});

var CustomList = React.createClass({
    getInitialState: function() {
        return {
            dragging:false,
            dropTarget:null,
            selectedIndex:0
        }
    },
    setSelected: function(index) {
        if(index <0) index = 0;
        var len = this.props.items.length;
        if(index > len -1) {
            index = len-1;
        }
        this.setState({
            selectedIndex:index
        });
        var child = this.refs['child'+index];
        var dom = React.findDOMNode(child);
        dom.focus();
        if(this.props.onSelect) {
            this.props.onSelect(child.props.item,index);
        }
    },
    getSelectedItem: function() {
        var index = this.state.selectedIndex;
        var child = this.refs['child'+index];
        return child.props.item;
    },
    dragOver: function(info) {
        this.setState({
            dragging:true,
            dropTarget:info.item,
            dropY:info.clientY-info.bounds.top
        });
    },
    drop: function(info) {
        var dropY = info.clientY - info.bounds.top;
        if(dropY < info.bounds.height/2) {
            //ListModel.moveItemBefore(info.itemid,info.dropid);
        } else {
            //ListModel.moveItemAfter(info.itemid,info.dropid);
        }
        this.setState({
            dragging:false,
            dropTarget:null,
            dropy:-1
        })
    },
    keyPressed: function(e) {
        if(e.metaKey == true && e.key == 'ArrowDown') {
            var len = this.props.items.length;
            if(this.state.selectedIndex >= len-1) return;
            var schild = this.getSelectedItem();
            var index = this.state.selectedIndex;
            var child = this.refs['child'+(index+1)];
            var tid = child.props.item.id;
            //ListModel.moveItemAfter(schild.id,tid);
            this.setSelected(this.state.selectedIndex+1);
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if(e.metaKey == true && e.key == 'ArrowUp') {
            if(this.state.selectedIndex <= 0) return;
            var index = this.state.selectedIndex;
            var schild = this.getSelectedItem();
            var child = this.refs['child'+(index-1)];
            var tid = child.props.item.id;
            //ListModel.moveItemBefore(schild.id,tid);
            this.setSelected(this.state.selectedIndex-1);
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if(e.key == 'ArrowDown') {
            this.setSelected(this.state.selectedIndex+1);
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if(e.key == 'ArrowUp') {
            this.setSelected(this.state.selectedIndex-1);
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if(this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    },
    render: function() {
        var self = this;
        var kids = this.props.items.map(function(item,i) {
            var id = item.id;
            if(!id) id = i;
            return (<ListItem key={id}
                              item={item}
                              index={i}
                              ref={'child'+i}
                              parentDragOver={self.dragOver}
                              dropTarget={self.state.dropTarget}
                              dropY={self.state.dropY}
                              parentDrop={self.drop}
                              selectedIndex={self.state.selectedIndex}
                              setSelected={self.setSelected}
                              template={self.props.template}
                />);
        });
        return (<ul className="list scroll grow" onKeyDown={this.keyPressed}>{kids}</ul>);
    }
});


module.exports = CustomList;