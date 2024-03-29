import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { theme } from '../constants';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import Alerts from '../components/Alerts';

const ChangeNameScreen = () => {
  //context
  const alertContext = React.useContext(AlertContext);
  const { setAlert, alerts } = alertContext;
  const authContext = React.useContext(AuthContext);
  const { user, token, logout, loadUser, updateDetails, error, successmessage, clearErrors } = authContext;

  //state
  const [localName, setLocalName] = React.useState(user.name);
  const { email } = user;

  //logic
  const updateName = () => {
    if (localName.length > 2) {
      Keyboard.dismiss();
      updateDetails({ name: localName, email });
    } else {
      setAlert('You need to use a name with atleast 2 characters', 'danger');
    }
  };

  //useEffect
  React.useEffect(() => {
    if (error === 'Successfully updated profile') {
      setAlert(error, 'success');
      clearErrors();
    }
    error !== null && console.log('not null');
  }, [error]);

  //jsx
  return (
    <View>
      <Alerts />
      <View style={styles.row}>
        <Text style={styles.label}>Name </Text>

        <TextInput autoFocus autoCorrect={false} minLength={2} style={styles.input} onChangeText={(text) => setLocalName(text)}>
          {localName}
        </TextInput>
      </View>
      <TouchableOpacity onPress={updateName}>
        <Text style={styles.button}>Update Name</Text>
      </TouchableOpacity>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  label: {
    flex: 1,
    fontSize: 24,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
    paddingLeft: 15,
  },
  input: {
    flex: 2,
    justifyContent: 'flex-start',
    textAlign: 'center',

    margin: 0,
    fontSize: 18,
    color: theme.colors.dark,
    borderBottomWidth: 3,
    borderColor: theme.colors.gray,
  },
  chevron: {
    paddingRight: 10,
  },
  button: {
    marginHorizontal: 15,
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',

    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.dark,
    paddingVertical: 10,

    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
export default ChangeNameScreen;
