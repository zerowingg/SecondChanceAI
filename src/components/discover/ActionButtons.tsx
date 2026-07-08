import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { COLORS } from "../../theme/colors";

interface Props {
  onLike: () => void;
  onPass: () => void;
}

export default function ActionButtons({
  onLike,
  onPass,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.pass]}
        onPress={onPass}
      >
        <Text style={styles.icon}>❌</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.like]}
        onPress={onLike}
      >
        <Text style={styles.icon}>❤️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  pass: {
    backgroundColor: "#FDECEC",
  },

  like: {
    backgroundColor: "#FFF5E3",
  },

  icon: {
    fontSize: 28,
  },
});