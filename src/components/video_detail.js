import React from 'react';
import THREE from 'three';

const VideoDetail = ({video}) => {
	//console.log(THREE);
	// this.camera = new THREE.PerspectiveCamera( 129, window.innerWidth / window.innerHeight, 1, this.zDepth );	
	// this.camera.position.y = - 1;	
	// this.scene = new THREE.Scene();	
	// this.renderer = new THREE.CSS3DRenderer();	


	if (!video) {
		return (<div>loading...</div>);
	}

	const url = `https://www.youtube.com/embed/${video.id.videoId}`;

	return (
		<div className='video-detail col-md-8'>
			<div className='embed-responsive embed-responsive-16by9'>
				<iframe className='embed-item' src={url}/>
			</div>
			<div className='details'>
				<div><strong>
					{video.snippet.channelTitle}
				</strong></div>
				<div>
					{video.snippet.description}
				</div>
			</div>
		</div>
	);

}

export default VideoDetail;