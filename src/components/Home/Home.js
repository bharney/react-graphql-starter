import React, { Component } from 'react';
import Picker from './Picker'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../../store/actions'
import Loading from "../Common/Loading"
class Home extends Component {
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = (nextSubreddit) => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }
  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Home.</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col col-md-6">
              <Picker
                value={selectedSubreddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend']}
              />
            </div>
            <div className="col col-md-6 text-right">
              <p>
                {lastUpdated && (
                  <span>
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
                  </span>
                )}
                {!isFetching && (
                  <button className="btn btn-primary" onClick={this.handleRefreshClick}>Refresh</button>
                )}
              </p>
            </div>
            <div className="col">
              {isFetching && posts.length === 0 && <Loading />}
              {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
              {posts.length > 0 && (
                <div className="card-columns">
                  {posts.map((post, i) => (
                    <div className="card" style={{ opacity: isFetching ? 0.5 : 1 }}>
                      <div className="card-body">
                        <p key={i}>{post.title}</p>
                        <p><a className="btn btn-secondary" href={post.url} role="button">View details »</a></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
      isFetching: true,
      items: []
    }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Home);
