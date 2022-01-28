import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react, { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDg0OSwiZXhwIjoxOTU4ODgwODQ5fQ.hiNNTJvYUxjpksM6XWwbM1Xj9DzBFhmxO0ytOx-YJGM';

const SUPABASE_URL = 'https://eweypzuiumvvbmsghrvz.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensRealTime(adicionaMensagem) {
    supabaseClient.from('Mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new)
            
        })
        
        .subscribe();
}

export default function ChatPage() {
    const rosteamento = useRouter()
    const usuarioLogado = rosteamento.query.username;
    const [mensagem, setMensagem] = react.useState('')
    const [listaDeMensagens, setListaDeMensagens] = react.useState([])

    react.useEffect(() => {
        supabaseClient
            .from('Mensagens')
            .select('*')
            .order('id', { ascending: false})
            .then(({ data }) => {
                setListaDeMensagens(data)
            });
        escutaMensagensRealTime((novaMensagem) => {
            setListaDeMensagens((valorAtualLista) => {
                return [
                    novaMensagem,
                ...valorAtualLista,
                ]
            });
            
        })
        
    }, [])
    
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            message: novaMensagem,
        };

        supabaseClient.from('Mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                
            })
            
            setMensagem('');
    }


    function deletarMensagem(qualMensagem) {
        supabaseClient.from('Mensagens')
            .delete()
            .match({id: qualMensagem.id})
            .then(({data}) => {
            
            })
        
    }
    

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[400],
                backgroundImage: `url(https://images.unsplash.com/photo-1550010565-d20b4cb367b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.primary[600],
                    height: '100%',
                    maxWidth: '50%',
                    maxHeight: '95vh',
                    padding: '32px',
                    border:`1px solid ${appConfig.theme.colors.primary[500]}`,
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} deletarMensagem={deletarMensagem}/>
                    

                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.message}
                            </li>
                        )
                    })} */}



                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) => {
                                const valor = e.target.value;
                                setMensagem(valor)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '85%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                border: `1px solid ${appConfig.theme.colors.primary[500]}`,
                                hover: {
                                    border: `1px solid ${appConfig.theme.colors.primary[500]}`,
                                },
                                focus: {
                                border: `1px solid ${appConfig.theme.colors.primary[400]}`,
                                    
                                }
                            }}
                        />
                        
                        <ButtonSendSticker onStickerClick={(sticker) => {
                            console.log('[USANDO O COMPONENTE] Salva esse Sticker no banco', sticker)
                            handleNovaMensagem(`:sticker:${sticker}`)
                        }} />

                        <Button
                            iconName="arrowUp"
                            buttonColors={appConfig.theme.colors.primary[500]}
                            styleSheet={{
                                fontSize: '20px',
                                backgroundColor: appConfig.theme.colors.primary[500],
                                color: appConfig.theme.colors.primary[600],
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[200],
                                }
                            }}
                            onClick={(e) => {
                                if (mensagem.length === 0) {
                                    e.preventDefault();
                                    console.log('nao vou enviar')
                                } else {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem)
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',color:`${appConfig.theme.colors.primary[500]}`,}} >
                <Text variant='heading4'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            position:'relative',
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems:'center',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>

                            

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}

                                <Button iconName="FaRegTrashAlt"
                                    colorVariant='negative'
                                    variant='tertiary'
                                    styleSheet={{
                                        position: 'absolute',
                                        right:'25px',
                                        fontSize: '15px',
                                        color: appConfig.theme.colors.primary[500],
                                    }}
                                    
                                    onClick={() => {
                                        
                                        props.deletarMensagem(mensagem)
                                    }}
                                />
                            </Text>

                        </Box>
                        {/* condicional: {mensagem.menssage.starts.with(':sticker').toString()} */}
                                {mensagem.message.startsWith(':sticker:')
                                    ? (
                                        <Image src={mensagem.message.replace(':sticker:', '')}/>
                                )
                                    : (
                                        mensagem.message
                                    )
                                }
                        {/* {mensagem.message} */}
                    </Text>
                )

            })}
        </Box>
    )
}