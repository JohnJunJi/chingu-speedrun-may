import React, { Component } from 'react';

import Board from './Board';

class App extends Component {
	constructor() {
		super();

		this.state = {
			cells : ['', '', '', '', '', '', '', '', ''],
			current_player: 'X',
			winner: undefined,
			draw: false,
			won_combo: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			winning_combo: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
			running: false,
			player: '',
			computer: ''
		}

		this.handleClick = this.handleClick.bind(this);
		this.checkWin = this.checkWin.bind(this);
		this.checkDraw = this.checkDraw.bind(this);
	}

	handleClick(id) {
		let { cells, current_player, winner } = this.state;

		if(!winner) {
			if(!cells[id]){
				cells[id] = current_player;
				current_player = current_player === 'X' ? 'O' : 'X';
			}

			this.setState({ cells, current_player });
			if(!this.checkWin()) // checking if there was a winner, if no, check if the game is full
				this.checkDraw();
		}
	}

	checkWin() {
		let { cells, winning_combo, winner, won_combo } = this.state;

		for(let combo of winning_combo){
			if(cells[combo[0]] && cells[combo[1]] && cells[combo[2]]) { // cells aren't empty
				if(cells[combo[0]] === cells[combo[1]] && cells[combo[1]] === cells[combo[2]]){
					winner = cells[combo[0]];

					won_combo[combo[0]] = 1;
					won_combo[combo[1]] = 1;
					won_combo[combo[2]] = 1;

					this.setState({ winner, won_combo });
					return true;
				}
			}
		}

		return false;
	}

	checkDraw() {
		let { cells } = this.state;
		if(cells.indexOf('') === -1){
			this.setState({ draw: true });
			return true;
		}

		return false;
	}

	resetGame() {
		this.setState({
			cells: ['', '', '', '', '', '', '', '', ''],
			winner: undefined,
			draw: false,
			current_player: 'X',
			won_combo: [0, 0, 0, 0, 0, 0, 0, 0, 0]
		});
	}

	setUser(XorO) {
		if(XorO === 'X'){
			this.setState({ running: true, player: 'X', computer: 'O' });
		} else {
			this.setState({ running: true, player: 'O', computer: 'X' });
		}
	}

	render() {
		const { cells, winner, draw, won_combo, running, player, computer } = this.state;

		return (
			<div className="container-fluid">
				<div className="row">
					{ running ? (
						<div className="col-md-12">
							<Board cells={cells} check={this.handleClick} won_combo={won_combo} />
							{ winner ? (
								<div className="text-center">
									<p>{ winner === player ? 'You won the game! Congratulations!' : 'You lost the game.' }</p>
									<button onClick={() => this.resetGame()} className="btn btn-primary">Play again</button>
								</div>
							) : draw ? (
								<div className="text-center">
									<p>It is a draw!</p>
									<button onClick={() => this.resetGame()} className="btn btn-primary">Play again</button>
								</div>
							) : '' }
						</div>
					) : (
						<div className="text-center">
							<h2>Welcome to Tic-Tac-Toe</h2>
							<p>Would you want to be...</p>
							<button onClick={() => this.setUser('X')} className="btn btn-primary">X</button>
							<span className="mg-lr-10">or</span>
							<button onClick={() => this.setUser('O')} className="btn btn-primary">O</button>
						</div>
					) }

					<footer className="nav navbar-defaul navbar-fixed-bottom">
						<div className="container">
							<p className="text-center">Create with <i className="fa fa-heart"></i> by <a target="_blank" href="http://www.florin-pop.com">Florin Pop</a>. Github <a target="_blank" href="https://github.com/florinpop17/chingu-speedrun-may">repo</a>.</p>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

export default App;
