function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }

      /* ./App fit Height */ 
        `}</style>
    )
}

function Titulo(props) {
    const Tag = props.tag

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag}{
                        
                        font-size: 24px;
                        font-weigth:600;
                    }
                `}
            </style>
        </>
    )
}

// Componente React
function HomePage() {
    //JSX
    return (
        < div >
            <GlobalStyle></GlobalStyle>
            <Titulo className="text-9xl text-green-400" tag="h2">Bem vindo de volta!</Titulo>
            <h2>Discord - Ronaldjga</h2>
        </div >

    )
}

export default HomePage