import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import TwitterIcon from 'material-ui-mdi/icons/twitter';
import YoutubeIcon from 'material-ui-mdi/icons/youtube-play';
import FaceBookIcon from 'material-ui-mdi/icons/facebook';
import Colors from 'material-ui/lib/styles/colors';

const carouselStyle = {
  container: {
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  elements: {
    position: 'absolute',
  },
};

class Carousel extends Component {
  static propTypes = {
    rotation: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    elementStyle: React.PropTypes.object,
    gap: React.PropTypes.number,
  };
  static defaultProps = {
    rotation: 0,
    style: {},
    elementStyle: {},
    gap: 0,
  };
  render() {
    const { children, rotation, height, gap, elementStyle, style, ...rest } = this.props;
    const numberOfElements = React.Children.count(children);
    const offset = Math.round((height + gap) / 2) / Math.tan(Math.PI / numberOfElements);
    const genStyle = (idx) => ({
      transform: `rotateX(${idx * 360 / numberOfElements}deg) translateZ(${offset}px)`,
    });
    const containerStyle = { ...carouselStyle.container, ...style, transform: `translateZ(${-offset}px) rotateY(5deg) rotateX(${rotation}deg)` };
    return (
      <div style={containerStyle}>
        {React.Children.map(children, (ch, idx) => (<div style={{ ...carouselStyle.elements, ...elementStyle, ...genStyle(idx) }}>{ch}</div>))}
      </div>
    );
  }
}

export class App extends Component {
  state = { rotation: 0 };
  componentDidMount() {
    const intrvl = setInterval(() => this.setState({ ...this.state, rotation: (this.state.rotation + 60) % 1080 }), 2000);
    this.setState({ intrvl, ...this.state });
  }

  componentWillUnmount() {
    if (this.state.intrvl)
      clearInterval(this.state.intrvl);
  }

  render() {
    const spanStyle = {
      width: '500px',
      height: '50px',
      backfaceVisibility: 'hidden',
      opacity: 0.8,

      // background: '#ddd',
    };
    return (
      <div style={{ perspective: '1000px', marginTop: '100px' }}>
        <Carousel height={50} gap={10} rotation={this.state.rotation} style={{ width: '500px', height: '50px', transition: 'transform 1s cubic-bezier(0.87, 0, 0.19, 1.44)' }}>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="@itsbth" labelPosition="after" icon={<TwitterIcon />} /></Paper>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="itsbth" labelPosition="after" icon={<YoutubeIcon />} /></Paper>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="lol nope" labelPosition="after" icon={<FaceBookIcon />} /></Paper>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="@itsbth" labelPosition="after" icon={<TwitterIcon />} /></Paper>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="itsbth" labelPosition="after" icon={<YoutubeIcon />} /></Paper>
          <Paper style={spanStyle}><FlatButton style={{ height: '50px' }} label="this should really work" labelPosition="after" icon={<FaceBookIcon />} /></Paper>
        </Carousel>
      </div>
    );
  }
}
