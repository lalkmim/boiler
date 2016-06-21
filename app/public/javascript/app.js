/* global ReactDOM, React */
var Hello = React.createClass({
  render: function() {
    return (     
       <div>
        <h1>Hello</h1>
        <p>{this.props.name}</p>
       </div>
    );
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('app')
);
