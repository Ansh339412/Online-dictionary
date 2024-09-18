import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet } from 'react-native';

const DictionaryApp = () => {
  const [searchWord, setSearchWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [example, setExample] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the definition and example
  const fetchDefinition = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      const data = await response.json();

      if (data.title) {
        setError('Word not found');
        setDefinition(null);
        setExample(null);
      } else {
        const wordDefinition = data[0].meanings[0].definitions[0];
        setDefinition(wordDefinition.definition);
        setExample(wordDefinition.example || ' soory No example available');
        setError(null);
      }
    } catch (err) {
      setError('Error fetching definition');
      setDefinition(null);
      setExample(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Online Dictionary</Text>
      </View>

      {/* Search Box */}
      <TextInput
        style={styles.input}
        placeholder="Type a word..."
        value={searchWord}
        onChangeText={(text) => setSearchWord(text)}
      />

      <Button title="Search" onPress={fetchDefinition} />

      {/* Display Definition, Example, or Error */}
      <View style={styles.result}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.definitionText}>Definition: {definition}</Text>
            <Text style={styles.exampleText}>Example: {example}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

// Styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200ea',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#6200ea',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
  },
  definitionText: {
    fontSize: 18,
    color: '#333',
  },
  exampleText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DictionaryApp;