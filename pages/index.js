import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import react from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';


function Titulo(props) {
  const Tag = props.tag || 'h1';

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
                    ${Tag}{
                        color:${appConfig.theme.colors.neutrals['100']};
                        font-size: 24px;
                        font-weigth:600;
                    }
                `}
      </style>
    </>
  )
}

// // Componente React
// function HomePage() {
//     //JSX
//     return (
//         < div >
//             <GlobalStyle></GlobalStyle>
//             <Titulo className="text-9xl text-green-400" tag="h2">Bem vindo de volta!</Titulo>
//             <h2>Discord - Ronaldjga</h2>
//         </div >

//     )
// }

// export default HomePage

export default function PaginaInicial() {
  // UseState nos retorna duas respostas em array, o nome + SetNome. Usamos ReactUseState('value inicial da varialvel nome)
  const [username, setUsername] = react.useState('Ronaldjga')
  const rosteamento = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[400],
          backgroundImage: 'url(https://images.unsplash.com/photo-1550010565-d20b4cb367b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            gap:'15px',
            justifyContent: 'space-between',
            flexDirection: {
              lg:'row',
              xs: 'column',
              sm: 'column',
            },
            width: '100%', maxWidth: {lg:'700px', xs:'75%',},
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.primary[600],
            border: `2px solid ${appConfig.theme.colors.primary[500]}`
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (e) {
              e.preventDefault();
              console.log('Alguem submeteu o form')

              rosteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', order:'2',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>


            {/* <input
              type="text"
              value={username}
              //onChange capta as alterações no input
              onChange={function (e) {
                console.log('usuario está digitando', e.target.value);
                // Onde está o valor??
                const valor = e.target.value;
                // Trocar o valor da variavel
                // Atravéz do react avise quem precisa, por isso é melhor utilizando react
                setUsername(valor)
              }}
            /> */}

            <TextField
              value={username}
              //onChange sempre que tiver uma mudança ele monitora
              onChange={function (e) {
                // Onde está o valor??
                const valor = e.target.value;
                // Trocar o valor da variavel
                // Atravéz do react avise quem precisa, por isso é melhor utilizando react
                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[500],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.primary[400],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              styleSheet={{
                border: `2px solid ${appConfig.theme.colors.primary[500]}`,
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[500],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary[500],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',

            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              tag='h2'
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}