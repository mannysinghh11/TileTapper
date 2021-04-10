import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/GameTile.css'

class GameTile extends React.Component {
	constructor(props){
      super(props);
    }

    render(){
        return(
            <button className={styles.container} row={this.props.gridRow} col={this.props.gridCol} onClick={()=> this.props.updateScore(this.props.gridRow, this.props.gridCol)}>
            </button>
        );
    }
}

export default GameTile;