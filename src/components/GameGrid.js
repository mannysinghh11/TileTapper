import React from 'react';
import ReactDOM from 'react-dom';

import GameTile from './GameTile.js'

import styles from '../styles/GameGrid.css';
import { ContactSupportOutlined, FreeBreakfastOutlined } from '@material-ui/icons';

class GameGrid extends React.Component {
	constructor(props){
      super(props);

      this.state = {
          score: 0
      }

      this.renderGrid = this.renderGrid.bind(this);
      this.renderGridTile = this.renderGridTile.bind(this);
      this.randomizeTiles = this.randomizeTiles.bind(this);
      this.resetAllTiles = this.resetAllTiles.bind(this);
      this.updateScore = this.updateScore.bind(this);
      this.checkTiles = this.checkTiles.bind(this);
      this.resetBoard = this.resetBoard.bind(this);
    }

    componentDidMount(){
        this.randomizeTiles();
    }

    componentDidUpdate(){
        if(this.checkTiles()){
            this.randomizeTiles();
        }

        
    }

    checkTiles(){
        var arr = document.getElementsByTagName('button');
        var coloredTile = styles.blackTile;
        
        for(var i = 0; i < arr.length; i++){
            if(arr[i].className == coloredTile){
                return false;
            }
        }

        return true;
    }

    renderGrid(height, width){
        var arr = [];

        for(var i = 1; i <= width; i++){
            arr.push(i);
        }

        return (
            arr.map((data, i) => {
                //console.log(data);
                return (
                    <div className={styles.row} key={i}>
                        {this.renderGridTile(height , i)}      
                    </div>
                );
            })
        );
    }

    renderGridTile(height, key){
        var arr = [];

        for(var i = 0; i < height; i++){
            arr.push(i);
        }

        return(
            arr.map((data, i) => {
              return(
                  <GameTile key={i} className={styles.tile} gridRow={key} gridCol={i} updateScore={this.updateScore}/>
              )  
            })
        );
    }

    randomizeTiles(){
        this.resetAllTiles();

        var coloredTile = styles.blackTile;
        var numRandomTiles = Math.floor((this.props.height * this.props.width) / 2)

        for(var j = 0; j < numRandomTiles; j++){

            //generate 2 random numbers
            var randomWidth = Math.floor(Math.random() * (this.props.width));
            var randomHeight = Math.floor(Math.random() * (this.props.height));

            var arr = document.getElementsByTagName("button");
            for(var i = 0; i < arr.length; i++){
                if(arr[i].attributes.row.value == randomWidth){
                    if(arr[i].attributes.col.value == randomHeight){
                        arr[i].className = coloredTile;
                    }
                }
            } 
        }
    }

    resetAllTiles(){
        var normalTile = styles.normalTile;
        var arr = document.getElementsByTagName("button");
        
        for(var i = 0; i < arr.length; i++){
            arr[i].className = normalTile;
        }
    }

    updateScore(row, col){
        var normalTile = styles.normalTile;
        var coloredTile = styles.blackTile;

        var arr = document.getElementsByTagName("button");
        for(var i = 0; i < arr.length; i++){
            if(arr[i].attributes.row.value == row){
                if(arr[i].attributes.col.value == col){
                    if(arr[i].className == coloredTile){
                        document.getElementById("loseMessage").innerHTML = ""
                        var newScore = this.state.score;
                        arr[i].className = normalTile;
                        this.setState({
                            score: newScore+1
                        })
                    }else{
                        document.getElementById("loseMessage").innerHTML = "Aw you messed up."
                        this.resetBoard();
                    }
                }
            }
        } 
    }

    resetBoard(){
        this.setState({
            score: 0
        });

        this.randomizeTiles();
    }

    render(){
        return(
            <div>
                <div className={styles.gridContainer}>
                    <h1>{this.state.score}</h1>
                    <h2 className={styles.resetButton} onClick={this.resetBoard}>Reset</h2>
                    <p className={styles.message} id="loseMessage"></p>
                    {this.renderGrid(this.props.width, this.props.height)}
                </div>
            </div>
        );
    }
}

export default GameGrid;