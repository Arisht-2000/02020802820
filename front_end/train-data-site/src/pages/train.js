import React from "react";

const TrainData = () => {
	return (
		<div>
			<h1>
				trainnumber = {this.props.match.params.trainNumber}, render the details of perticular train from the api at "localhot:9000/trains" after generating token by visiting "localhot:9000/" if expired.
			</h1>
		</div>
	);
};

export default TrainData;