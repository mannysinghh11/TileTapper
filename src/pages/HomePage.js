import React from 'react';
import ReactDOM from 'react-dom';

import Slider from '@material-ui/core/Slider';
import GameGrid from '../components/GameGrid.js';

import styles from '../styles/HomePage.css';

class HomePage extends React.Component {
	constructor(props){
      super(props);

      this.state = {
          height: 3,
          width: 3
      }

      this.getDimensions = this.getDimensions.bind(this);
    }

    //dimensionType = height/width
    //dimensionValue = 1-10
    getDimensions(dimensionType, dimensionValue){
        if(dimensionType == "height"){
            this.setState({
                height: dimensionValue
            });
        }else if(dimensionType == "width"){
            this.setState({
                width: dimensionValue
            });
        }
    }

    render(){
        return(
            <div className={styles.container}>
                <div className = {styles.titleContainer}>
                    <p className = {styles.title}>How well can you click?</p>
                    <p className = {styles.directions}>Choose your board dimensions below and get to clicking!</p>
                </div>

                <div className = {styles.userInputContainer}>
                    <label htmlFor="height" className={styles.labelText}>Height: {this.state.height}</label>
                    <input type="range" min="2" max="8"id="height" className={styles.slider} 
                    onChange={() => this.getDimensions("height", height.value)} value={this.state.height}/>

                    <label htmlFor="width" className={styles.labelText}>Width: {this.state.width}</label>
                    <input type="range" min="2" max="8" id="width" className={styles.slider} 
                    onChange={() => this.getDimensions("width", width.value)} value={this.state.width}/>
                </div>

                <div className={styles.gameContainer}>
                    <GameGrid height={this.state.height} width={this.state.width}/>
                </div>
            </div>
        );
    }
}

export default HomePage;