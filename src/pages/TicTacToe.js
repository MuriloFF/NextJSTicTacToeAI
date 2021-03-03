
import Grid from '@material-ui/core/Grid';
import TicTacToeButton from '../components/ticTacToeButton'
import useTicTacToeController from '../controllers/ticTacToeController'
import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import styles from '../styles/Home.module.css'

export default function TicTacToe() {
    const { selectedItem, reset } = useTicTacToeController();
    const [game, setgame] = useState([null, null, null, null, null, null, null, null, null]);
    const [winnerButtons, setwinnerButtons] = useState([])
    const [playerWins, setPlayerWins] = useState(0)
    const [aIWins, setAIWins] = useState(0)
    const [buttons, setButtons] = useState([])
    const onClick = (e) => { selectedItem(e, game, setgame, setwinnerButtons, setPlayerWins, setAIWins) };

    // Update every time the game changes
    // useLayoutEffect(() => {


    // Crete the buttons
    useEffect(() => {
        let grids = []
        console.log('useEffect')
        for (var x = 0; x < 3; x++) {
            let arrayButtons = []
            for (var y = 0; y < 3; y++) {
                let id = (x * 3) + y
                arrayButtons.push(
                    <Grid item xs={4} key={`grid_${id}`}>
                        <TicTacToeButton style={winnerButtons.indexOf(id) === -1 ? {} : { backgroundColor: 'green' }} key={`btn_${id}`} id={id} className={styles.ticTacToeButton} onClick={onClick} disabled={game[id] != null}>{game[id]}</TicTacToeButton>
                    </Grid>
                );
            }
            grids.push(<Grid key={`grid_cont_${x}`} container spacing={6} >{arrayButtons}</Grid>);
        }
        setButtons(grids);
    }, [...game])
    // setButtons(grids)

    // let value = []
    // useEffect(() => {
    //     value = buttons
    // }, [...game])
    // }, [...game])

    return (<div className={styles.container}>
        <h4 className={styles.title}>
            Play agains the AI
      </h4>
        <div style={{ marginTop: '50px' }}>
            {buttons}
        </div >
        <h2 className={styles.subtitle} style={{ marginTop: '30px' }}> Score: </h2>
        <h2 className={styles.subtitle}>User: {playerWins} - AI: {aIWins}</h2>
        <Button variant="contained" color="primary" className={styles.resetButton} onClick={() => { reset(game, setwinnerButtons) }}>Reset</Button>
    </div >)
}