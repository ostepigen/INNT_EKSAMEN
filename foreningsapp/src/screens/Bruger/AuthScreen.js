import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import GS from '../../styles/globalstyles';

// Eksporterer AuthScreen, som håndterer skiftet mellem login og oprettelse
export default function AuthScreen() {
//state-variabel der styrer, om brugeren ser login eller oprettelsesformularen
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={GS.screen}>
      {isLogin ? <Login /> : <SignUp />}
      <View style={{ margin: 20 }}>
        <Button
          title={isLogin ? 'Klik her hvis du er ny' : 'Har du en konto? Log ind'}
          onPress={() => setIsLogin((prev) => !prev)}
          color="#255D32"
        />
      </View>
    </View>
  );
}
