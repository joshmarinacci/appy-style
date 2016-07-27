var React = require('react');
var ResizableColumn = React.createClass({
    getInitialState: function() {
        return {
            divWidth: 200,
            dragging: false
        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(this.state.dragging == true && prevState.dragging == false) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        }
        if(this.state.dragging == false && prevState.dragging == true) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    },
    columnMouseDown: function(e) {
        this.setState({
            dragging:true
        });
        e.preventDefault();
    },
    onMouseMove: function (e) {
        var rect = this.refs.pane.getDOMNode().getBoundingClientRect();
        var nv = e.pageX - rect.left;
        this.setState({
            divWidth: nv
        });
        e.stopPropagation();
        e.preventDefault();
    },
    onMouseUp: function (e) {
        this.setState({dragging:false});
        e.stopPropagation();
        e.preventDefault();
    },
    render: function() {
        var style = {
            minWidth:this.state.divWidth+'px',
            borderRightWidth:'1px',
            borderRightStyle:'solid',
            //cursor:'col-resize'
        };
        return (<div ref='pane'
                     onMouseDown={this.columnMouseDown}
                     className="resizable-column vbox"
                     style={style}
            >{this.props.children}</div>);
    }
});
module.exports = ResizableColumn;