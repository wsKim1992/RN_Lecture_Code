import { Text, View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;
/**
 * Dimensions :
 *     - window : status bar 제외 높이 너비
 *     - screen : status bar 포함 높이 너비
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: Colors.accent,
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});
