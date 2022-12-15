import { View, Text, Pressable, StyleSheet } from "react-native";
import Color from "../../constants/colors.js";

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
                android_ripple={{ color: Color.primary500 }}
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
        backgroundColor: Color.primary600,
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