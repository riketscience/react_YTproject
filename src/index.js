import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import ThreeComponent from './components/three_component';
import YTapi from 'youtube-api-search';
import _ from 'lodash';

const API_KEY = 'AIzaSyDXEKh5KOHCRQ9AVqNjMXiWQniCI2-yqWE';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			videos : [],
			selectedVideo: null
		};

		this.getVideos('skiing');
	}

	getVideos (term) {
		return YTapi({key:API_KEY, term:term}, videos => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0] 
			});
		});
	}

	render() { 
		const videoSearch = _.debounce((term => this.getVideos(term)), 333);
		return (
			<div>
				<SearchBar onInputChanged={videoSearch} />
			
				<VideoList 
					videos={this.state.videos}
					onSelectVideo = {selectedVideo => this.setState({selectedVideo})}
				/>
				<VideoDetail video={this.state.selectedVideo} />
				<ThreeComponent />
			
			</div>
		);
	}
}

ReactDOM.render(
    <App />, document.querySelector('.container')
);
