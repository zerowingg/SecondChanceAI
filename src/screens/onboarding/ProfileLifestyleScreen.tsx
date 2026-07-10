import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ProgressHeader from "../../components/ProgressHeader";

import {
  PERSONALITY,
  SMOKING,
  DRINKING,
  CHILDREN,
} from "../../data/lifestyle";

import { LANGUAGES } from "../../data/languages";

import { updateLifestyle } from "../../services/user.service";

import { COLORS } from "../../theme/colors";

export default function ProfileLifestyleScreen({
  navigation,
}: any) {
  const [personality, setPersonality] = useState("");
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");
  const [children, setChildren] = useState("");

  const [languages, setLanguages] = useState<string[]>([]);
  const [customLanguage, setCustomLanguage] = useState("");

  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(
        languages.filter((l) => l !== language)
      );
    } else {
      setLanguages([...languages, language]);
    }
  };

  const addCustomLanguage = () => {
    const value = customLanguage.trim();

    if (!value) return;

    if (!languages.includes(value)) {
      setLanguages([...languages, value]);
    }

    setCustomLanguage("");
  };

  const handleContinue = async () => {
    if (
      !personality ||
      !smoking ||
      !drinking ||
      !children
    ) {
      Alert.alert(
        "Incomplete",
        "Please complete all required fields."
      );
      return;
    }

    try {
      await updateLifestyle({
        personality,
        smoking,
        drinking,
        children,
      });

      navigation.replace("ProfileValues");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save lifestyle."
      );
    }
  };

  const renderOptions = (
    title: string,
    data: string[],
    selected: string,
    setter: (value: string) => void
  ) => (
    <>
      <Text style={styles.title2}>{title}</Text>

      <View style={styles.chips}>
        {data.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              selected === item &&
                styles.selectedChip,
            ]}
            onPress={() => setter(item)}
          >
            <Text
              style={[
                styles.chipText,
                selected === item &&
                  styles.selectedChipText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProgressHeader
          step={4}
          totalSteps={7}
          title="Lifestyle"
          subtitle="Help AI understand you better."
        />

        {renderOptions(
          "Personality",
          PERSONALITY,
          personality,
          setPersonality
        )}

        {renderOptions(
          "Smoking",
          SMOKING,
          smoking,
          setSmoking
        )}

        {renderOptions(
          "Drinking",
          DRINKING,
          drinking,
          setDrinking
        )}

        {renderOptions(
          "Children",
          CHILDREN,
          children,
          setChildren
        )}

        <Text style={styles.title2}>
          Languages
        </Text>

        <View style={styles.chips}>
          {LANGUAGES.map((language) => {
            const selected =
              languages.includes(language);

            return (
              <TouchableOpacity
                key={language}
                style={[
                  styles.chip,
                  selected &&
                    styles.selectedChip,
                ]}
                onPress={() =>
                  toggleLanguage(language)
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    selected &&
                      styles.selectedChipText,
                  ]}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Add another language"
          value={customLanguage}
          onChangeText={setCustomLanguage}
        />

        <TouchableOpacity
          style={styles.smallButton}
          onPress={addCustomLanguage}
        >
          <Text style={styles.smallButtonText}>
            Add Language
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.background,
  },

  content:{
    padding:24,
    paddingBottom:60,
  },

  title2:{
    marginTop:25,
    marginBottom:12,
    fontSize:18,
    fontWeight:"700",
    color:COLORS.text,
  },

  chips:{
    flexDirection:"row",
    flexWrap:"wrap",
    gap:10,
  },

  chip:{
    backgroundColor:COLORS.white,
    paddingHorizontal:18,
    paddingVertical:12,
    borderRadius:30,
    borderWidth:1,
    borderColor:"#DDD",
  },

  selectedChip:{
    backgroundColor:"#FFF8EC",
    borderColor:COLORS.primary,
    borderWidth:2,
  },

  chipText:{
    color:COLORS.text,
    fontWeight:"600",
  },

  selectedChipText:{
    color:COLORS.primary,
  },

  input:{
    marginTop:20,
    backgroundColor:COLORS.white,
    borderRadius:18,
    paddingHorizontal:18,
    paddingVertical:16,
    borderWidth:1,
    borderColor:"#DDD",
  },

  smallButton:{
    marginTop:15,
    alignSelf:"flex-start",
    backgroundColor:COLORS.primary,
    paddingHorizontal:20,
    paddingVertical:12,
    borderRadius:25,
  },

  smallButtonText:{
    color:COLORS.white,
    fontWeight:"700",
  },

  button:{
    marginTop:40,
    backgroundColor:COLORS.primary,
    paddingVertical:18,
    borderRadius:30,
    alignItems:"center",
  },

  buttonText:{
    color:COLORS.white,
    fontSize:18,
    fontWeight:"700",
  },
});