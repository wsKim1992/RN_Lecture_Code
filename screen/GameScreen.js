import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../component/game/NumberContainer';
import PrimaryButton from '../component/ui/PrimaryButton';
import Title from '../component/ui/Title';
import Card from '../component/ui/Card';
import InstructionText from '../component/ui/IntructionText';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, gameOverHandler }) {
    const initialGuess = React.useMemo(() => {
        return generateRandomBetween(1, 100, userNumber);
    }, [userNumber])
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            gameOverHandler();
        }
    }, [currentGuess, userNumber, gameOverHandler])

    function nextGuessHandler(direction) {
        if (direction === 'lower' && currentGuess < userNumber
            || direction === 'greater' && currentGuess > userNumber) {
            Alert.alert("구라치지마 새끼야.", "",
                [{ text: 'Sorry!', style: 'cancel' },]
            )
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber);
    }
    return (
        <View style={styles.screen}>
            <Title>
                Opponent's Guess
            </Title>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card>
                <InstructionText style={styles.marginBottom}>Higher or lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="#fff" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="#fff" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    instructionTExt: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
})