// fælles style objekter 
import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({

//teskt styles
    overskrift: {
        fontSize: 14,
        fontWeight: "bold",
                fontFamily: "Helvetica",
        alignContent: "center",
        textAlign: "center",
        padding: 4,
        marginBottom: 8,
    },
    normaltekst: {
        fontSize: 14,
        fontFamily: "Times New Roman",
        padding: 4,
        marginBottom: 8
    },


// specifikke komponent styles
  opslagstavle: {
        backgroundColor: '#ceb89bff',
        borderRadius: 8,
        
       
    },


})


export default GlobalStyles;
