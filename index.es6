import React from 'react';
import Icon from '@economist/component-icon';


export default class WinCover extends React.Component {

  static get propTypes() {
    return {
      test: React.PropTypes.node,
      sceneTotal: React.PropTypes.number,
      defaultSceneIndex: React.PropTypes.number,
      prevNext: React.PropTypes.string,
      icon: React.PropTypes.object,
      onChangeIndex: React.PropTypes.func,
      entries: React.PropTypes.array,
    };
  }

  static get defaultProps() {
    return {
      sceneTotal: 30,
      defaultSceneIndex: 0,
      sceneTitle: null,
      icon: {
        color: '#fff',
        background: 'transparent',
      },
      prevNext: 'arrows',
    };
  }

  // Set default state:
  constructor(props) {
    super(props);
    this.state = { sceneIndex: props.defaultSceneIndex };
  }

  componentDidMount() {
    require('ftscroller');
    var containerElement;
    var scroller;
    containerElement = document.getElementById('scrollcontainer');
    const FTScroller = require('ftscroller');
    scroller = new FTScroller(containerElement, {
      scrollbars: false,
      scrollingX: true,
      updateOnWindowResize: true
    });
  }

  prevNext(arrow) {
    let index = this.state.sceneIndex;
    if (arrow === 'left') {
      if (index > 0) {
        index--;
      }
    } else if (index < (this.props.sceneTotal - 1)) {
      index++;
    }
    this.changeIndex(index);
  }
  indexClicked(index) {
    this.changeIndex(index);
  }
  changeIndex(newIndex) {
    if (this.props.onChangeIndex) {
      this.props.onChangeIndex(newIndex, this.state.sceneIndex);
    }
    this.setState({ sceneIndex: newIndex });
  }

  render() {
    const sceneIndex = this.state.sceneIndex;
    const sceneTotal = this.props.sceneTotal;
    let leftClass = 'win-cover-scroller-previous';
    let rightClass = 'win-cover-scroller-next';
    if (sceneIndex === 0) {
      leftClass += ' win-cover-scroller-arrow-hidden';
    } else if (sceneIndex === (sceneTotal - 1)) {
      rightClass += ' win-cover-scroller-arrow-hidden';
    }

    let previousArrow;
    let nextArrow;
    let previous;
    let next;
    if (this.props.prevNext === 'arrows') {
      previousArrow = <Icon icon="left" background={this.props.icon.background} color={this.props.icon.color}/>;
      nextArrow = <Icon icon="right" background={this.props.icon.background} color={this.props.icon.color}/>;
    }
    previous = (
      <div className={leftClass} key="left" onClick = {this.prevNext.bind(this, 'left')}>
        {previousArrow}
        <span></span>
      </div>
    );
    next = (
      <div className={rightClass} key="right" onClick = {this.prevNext.bind(this, 'right')}>
        {nextArrow}
        <span></span>
      </div>
    );

    const index = [];
    const bodycopy = [];
    const images = [];
    if (sceneIndex === 0) {
      this.props.entries.map((entry) => {
        let imageClass;
          imageClass = 'image--allselected';
          images.push(
              <img src={entry.image} className={imageClass}/>
          );
        })
      }

    this.props.entries.map((entry, i) => {
      let indexClass, bodyClass, imageClass;
      if (i === sceneIndex) {
        indexClass = 'win-cover-scrollerIndex--selected';
        bodyClass = 'bodyCopy--selected';
        imageClass = 'image--selected';
      }
      index.push(
        <li key={i} onClick={this.indexClicked.bind(this, i)}>
          <div className={indexClass}>{entry.tabtitle}</div>
        </li>
      );

      bodycopy.push(
          <div className={bodyClass}>
            <div dangerouslySetInnerHTML={ { __html: entry.bodycopy } }></div>
            <span className="win-cover-byline">{entry.byline}</span>
            <div className="win-cover-readmore">
            <a href={entry.url}>Read more
              <Icon className="win-cover-readmore-arrow" icon="right"/>
            </a>
            </div>
          </div>
      );
      images.push(
          <img src={entry.image} className={imageClass}/>
      );
    })

    return (
      <div className="win-cover">
        <div className="win-cover--imagecontainer">
          {images}
        </div>
        <div className="win-cover-scroller">
          {previous}
          <div id="scrollcontainer">
            <ul className="win-cover-scroller--inner">
              {index}
            </ul>
          </div>
          {next}
        </div>
          <div className="win-cover--bodyCopy">
            {bodycopy}
          </div>
        </div>
    );
  }
}
