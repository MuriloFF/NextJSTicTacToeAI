
import Grid from '@material-ui/core/Grid';
import TicTacToeButton from '../components/ticTacToeButton'
import useTicTacToeController from '../controllers/ticTacToeController'
import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import classNames from 'classnames'
import styles from '../styles/Home.module.css'

export default function TicTacToe() {
    const { selectedItem, reset } = useTicTacToeController();
    const [game, setgame] = useState([null, null, null, null, null, null, null, null, null]);
    const [winnerButtons, setwinnerButtons] = useState([])
    const [playerWins, setPlayerWins] = useState(0)
    const [aIWins, setAIWins] = useState(0)
    const [buttons, setButtons] = useState([])
    const onClick = (e) => { selectedItem(e, game, setgame, setwinnerButtons, setPlayerWins, setAIWins) };
    const imgX = () => { return <img src="/images/X.png" className={styles.ticTacToeImg} /> }
    const imgCircle = () => { return <img src="/images/Circle.png" className={styles.ticTacToeImg} /> }

    // Update every time the game changes
    useEffect(() => {
        // Create the buttons
        let grids = []
        // Lines
        for (var x = 0; x < 3; x++) {
            let arrayButtons = []
            // Columns
            for (var y = 0; y < 3; y++) {
                let id = (x * 3) + y
                // Add styles to top and bottom buttons
                let buttonStyle = x === 0 ? styles.buttonsTop : (x === 2 ? styles.buttonsBottom : '')
                // Add style to buttons that won the game
                let winnerButtonStyle = winnerButtons.indexOf(id) === -1 ? '' : styles.winnerButton
                arrayButtons.push(
                    <Grid item xs={4} key={`grid_${id}`} id={`grid_${id}`} className={buttonStyle} >
                        <TicTacToeButton key={`btn_${id}`} id={id} className={classNames(styles.ticTacToeButton, winnerButtonStyle)} onClick={onClick} disabled={game[id] !== null}>{game[id] === null || game[id] === "" ? "" : (game[id] === 'X' ? imgX() : imgCircle())}</TicTacToeButton>
                    </Grid >
                );
            }

            grids.push(<Grid key={`grid_cont_${x}`} container spacing={6}  >{arrayButtons}</Grid>);
        }
        setButtons(grids);
    }, [...game])

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>
                <img src='/favicon.ico' alt='Logo' /> Play agains the AI
            </h4>
            <div style={{ marginTop: '50px' }}>
                <Grid style={{ borderRadius: '6px', backgroundColor: '#AAA' }} >{buttons}</Grid>
            </div >
            <h4 className={styles.subtitle} style={{ marginTop: '30px' }}> Score: </h4>
            <h4 className={styles.subtitle}>User: {playerWins} - AI: {aIWins}</h4>
            <Button variant="contained" color="primary" className={styles.resetButton} onClick={() => { reset(game, setwinnerButtons) }}>Reset</Button>
        </div >)
}