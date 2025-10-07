import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import GS from '../../styles/globalstyles';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={GS.screen}>
      {isLogin ? <Login /> : <SignUp />}
      <View style={{ margin: 20 }}>
        <Button
          title={isLogin ? 'Har du ikke en konto? Opret en' : 'Har du en konto? Log ind'}
          onPress={() => setIsLogin((prev) => !prev)}
          color="#255D32"
        />
      </View>
    </View>
  );
}
