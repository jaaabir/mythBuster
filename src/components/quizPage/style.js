import { css, keyframes } from '@emotion/core';

export default{

    base : {
        height:'100vh',
        backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' ,
    },

    noMargin:{
        margin:0
    },

    container:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '6px',
          width: '50%',
        padding: '20px',
        height: '100px',
        marginTop: '10%'

    },

    wrapper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        height: '50%',
        justifyContent: 'space- around',
        margin: 'auto',
        width:'50%'


  },
  btnStyle:{
        minWidth: '100px',
    padding: '10px',
    borderRadius: '25px',
    color:'#FFF',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'uppercase',
    backgroundImage: 'linear-gradient(to bottom right,#2631f5 0,#6e75ff 100%)',
    boxShadow: '0 5px 10px 0 rgb(39 49 245 / 20%), 0 10px 30px 0 rgb(219 82 253 / 25%)',
  },



    gradient : keyframes`
                        0% {
                                background-position: 0% 50%;
                            }
                            50% {
                                background-position: 100% 50%;
                            }
                            100% {
                                background-position: 0% 50%;
                            }
`,

  
}