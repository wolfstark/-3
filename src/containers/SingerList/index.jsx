import { connect } from 'react-redux';
import React, { Component } from 'react';
import ListView from '../../components/ListView';
import { getSingerList } from '../../api/singer';
import { ERR_OK } from '../../api/config.js';
import Singer from '../../common/js/singer';
import SingerDetail from '../SingerDetail';
import PropTypes from 'prop-types';

// import { Route } from 'react-router-dom';

class SingerList extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      singers: [],
    };
    this.HOT_SINGER_LEN = 10;
    this.HOT_NAME = '热门';
  }
  render() {
    return (
      <div>
        <ListView
          select={this.selectSinger.bind(this)}
          data={this.state.singers}
        />
        <SingerDetail />
      </div>
    );
  }
  componentDidMount() {
    this._getSingerList();
  }
  async _getSingerList() {
    const res = await getSingerList();
    if (res.code === ERR_OK)
      this.setState({ singers: this._normalizeSinger(res.data.list) });
  }
  _normalizeSinger(list) {
    let map = {
      hot: {
        title: this.HOT_NAME,
        items: [],
      },
    };
    list.forEach((item, index) => {
      if (index < this.HOT_SINGER_LEN) {
        map.hot.items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
          })
        );
      }
      const key = item.Findex;
      if (!map[key]) {
        map[key] = {
          title: key,
          items: [],
        };
      }
      map[key].items.push(
        new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
        })
      );
    });
    // 为了得到有序列表，我们需要处理 map
    let ret = [];
    let hot = [];
    for (let key in map) {
      let val = map[key];
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val);
      } else if (val.title === this.HOT_NAME) {
        hot.push(val);
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });
    return hot.concat(ret);
  }
  selectSinger(singer) {
    this.props.history.push(`/singer/${singer.id}`);
    this.setSinger(singer);
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    prop: state.prop,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingerList);
