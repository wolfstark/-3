import React, { Component } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

class Scroll extends Component {
  static propsType = {
    probeType: PropTypes.number,
    click: PropTypes.bool,
    data: PropTypes.array.isRequired,
    refreshDelay: PropTypes.number,
    onScroll: PropTypes.func,
    onScrollToEnd: PropTypes.func,
    onBeforeScroll: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    probeType: 1,
    click: true,
    refreshDelay: 20
  };
  constructor(props) {
    super(props);
    this.scroll = null;
  }

  componentDidMount() {
    this._initScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      setTimeout(() => {
        this.refresh();
      }, this.props.refreshDelay);
    }
  }

  componentWillUnmount() {
    this.scroll.destroy();
  }

  render() {
    return (
      <div className={this.props.className} ref="wrapper">
        {this.props.children}
      </div>
    );
  }
  _initScroll() {
    this.scroll = new BScroll(this.refs.wrapper, {
      probeType: this.props.probeType,
      click: this.props.click
    });

    if (this.props.onScroll) {
      this.scroll.on("scroll", pos => {
        this.props.onScroll(pos);
      });
    }

    if (this.props.onScrollToEnd) {
      this.scroll.on("scrollEnd", () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          this.props.onScrollToEnd();
        }
      });
    }

    if (this.props.onBeforeScroll) {
      this.scroll.on("beforeScrollStart", () => {
        this.props.onBeforeScroll();
      });
    }
  }
  disable() {
    this.scroll && this.scroll.disable();
  }
  enable() {
    this.scroll && this.scroll.enable();
  }
  refresh() {
    this.scroll && this.scroll.refresh();
  }
  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
}

export default Scroll;
