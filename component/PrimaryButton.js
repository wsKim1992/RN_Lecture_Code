import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = (props) => {
    const { children, onPress } = props;
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.buttoninnerContainer, styles.pressed]
                        : styles.buttoninnerContainer
                }
                onPress={onPress}
                android_ripple={{ color: '#72063c' }}
            >
                <Text style={styles.buttonText}>{children}</Text>

            </Pressable>
        </View>
    )

}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttoninnerContainer: {
        backgroundColor: '#640233',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
})