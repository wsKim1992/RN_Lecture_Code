import { CATEGORIES } from "../data/dummy-data";
import { FlatList, StyleSheet } from "react-native";
import CategoryGridTile from "../conponents/CategoryGridTile";

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    }
    return (
      <CategoryGridTile
        onPress={pressHandler}
        title={itemData.item.title}
        color={itemData.item.color}
      />
    );
  }
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
