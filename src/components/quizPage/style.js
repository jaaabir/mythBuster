import { css, keyframes } from '@emotion/core'
import { purple } from '@material-ui/core/colors'

export default{

    base : {
        height:'100vh',
        backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' ,
    },

    qsnContainer:{
        margin:0,
        display: 'flex',
        flex: 1
    },

    container:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '6px',
        width: '100%',
        padding: '20px',
        // height: '100px',
        marginTop: '10%',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        '@media(max-width: 450px)': {
            height: '100%'
        }

    },

    wrapper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        height: '50%',
        justifyContent: 'space- around',
        margin: 'auto',
        width:'50%',
         '@media(max-width: 450px)': {
             height: '70%'
        }


  },
  btnStyle:{
        minWidth: '100px',
    padding: '10px',
    borderRadius: '5px',
    color:'#FFF',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'uppercase',
    background:'transparent',
    border: '1px solid white',
      '&:hover': {
          transition: '0.3s',
          backgroundImage: 'linear-gradient(to bottom right,#2631f5 0,#6e75ff 100%)',
          boxShadow: '0 5px 10px 0 rgb(39 49 245 / 20%), 0 10px 30px 0 rgb(219 82 253 / 25%)',
      }



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

    btnContainer: css`
                display: flex;
                justify-content: space-between;
                width: 40%;
                margin: auto;
                @media (max-width: 450px) {
                     display: block;
                    text-align: center;
                }
               
    `,
    themeBar: css`
     @media (max-width: 450px) {
        display: none;
        
      }

    `,
    scoreStyle: css `
      position: absolute;
        right: 5px;
        top: 100px;
        border: 2px solid white;
        border-radius: 20px;
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        @media (max-width: 450px) {
            top: 85%;
            left:10px;
            right: 0;
            //  margin: auto; 
              bottom: 10px;
        
      }

    
    `

  
}