
import Grid from '@material-ui/core/Grid';
import TicTacToeButton from '../components/ticTacToeButton'
import useTicTacToeController from '../controllers/ticTacToeController'
import { useState } from 'react'
import { Button } from '@material-ui/core';
import styles from '../styles/Home.module.css'

export default function TicTacToe() {
    const { selectedItem, reset } = useTicTacToeController();
    const [game, setgame] = useState([null, null, null, null, null, null, null, null, null]);
    const [winnerButtons, setwinnerButtons] = useState([])
    const [playerWins, setPlayerWins] = useState(0)
    const [aIWins, setAIWins] = useState(0)

    // Crete the buttons
    function buttons() {
        const arrayGrid = [];
        for (var x = 0; x < 3; x++) {
            let arrayButtons = []
            for (var y = 0; y < 3; y++) {
                let id = (x * 3) + y
                arrayButtons.push(
                    <Grid item xs={4} key={`grid_${id}`}>
                        <TicTacToeButton style={winnerButtons.indexOf(id) === -1 ? {} : { backgroundColor: 'green' }} key={`btn_${id}`} id={id} className={styles.ticTacToeButton} onClick={(e) => { selectedItem(e, game, winnerButtons, setwinnerButtons, playerWins, setPlayerWins, aIWins, setAIWins) }} disabled={game[id] != null}>{game[id]}</TicTacToeButton>
                    </Grid>
                );
            }
            arrayGrid.push(<Grid key={`grid_cont_${x}`} container spacing={6} >{arrayButtons}</Grid>);
        }
        return arrayGrid;
    }

    return (<div className={styles.container}>
        <h4 className={styles.title}>
            Play agains the AI
      </h4>
        <div style={{ marginTop: '50px' }}>
            {buttons()}
        </div >
        <h2>
            <div style={{ marginTop: '30px' }}> Score: </div>
            <div>User: {playerWins} - AI: {aIWins}</div>
        </h2>
        <Button variant="contained" color="primary" className={styles.resetButton} onClick={() => { reset(game, setwinnerButtons) }}>Reset</Button>
    </div >)
}