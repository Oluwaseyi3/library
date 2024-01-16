import React, { useState } from 'react';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygon } from 'wagmi/chains'
import 'antd/dist/antd.css';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
    return new Web3Provider(provider);
}




const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygon],
    [publicProvider()],
  )
   
  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  })

//   const theme = {
//     maxWidth: '1500px',
//     primary: '#0000FF',
//     darkGrey: darkMode ? '#FFFFFF' : '#292929',  // Adjust dark mode color
//     grey: '#AAAAAA',
//     spaceGrey: '#EFEFEF',
//     white: darkMode ? '#000000' : '#FFFFFF',   // Adjust dark mode color
//     primaryDark: '#d15e43',
// };

export default function NextWeb3App({ Component, pageProps }: AppProps) {
    const [darkMode, setDarkMode] = useState(false);

  const theme = {
    maxWidth: '1500px',
    primary: '#0000FF',
    darkGrey: darkMode ? '#FFFFFF' : '#292929',  // Adjust dark mode color
    grey: '#AAAAAA',
    spaceGrey: '#EFEFEF',
    white: darkMode ? '#000000' : '#FFFFFF',  
    whiteText: darkMode ? '#FFFFFF' : '#000000', 
    shadow: darkMode ? '#FFFFFF' : '#000000',
    // Adjust dark mode color
    primaryDark: '#d15e43',
};
        const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <WagmiConfig config={config}>
            <style jsx global>{`
                @font-face {
                    font-family: 'Optima';
                    font-style: normal;
                    font-weight: normal;
                    src: url('/fonts/OPTIMA.woff') format('woff');
                }

                @font-face {
                    font-family: 'Optima';
                    font-style: normal;
                    font-weight: bold;
                    src: url('/fonts/OPTIMA_B.woff') format('woff');
                }

                @font-face {
                    font-family: 'Visuelt';
                    font-style: normal;
                    font-weight: bold;
                    src: url('/fonts/VisueltPro-Bold.ttf') format('truetype');
                }

                @font-face {
                    font-family: 'Visuelt';
                    font-style: normal;
                    font-weight: light;
                    src: url('/fonts/VisueltPro-Light.ttf') format('truetype');
                }

                @font-face {
                    font-family: 'Visuelt';
                    font-style: normal;
                    font-weight: normal;
                    src: url('/fonts/VisueltPro-Regular.ttf') format('truetype');
                }

                body {
                    margin: 0;
                    background-color: ${darkMode ? theme.darkGrey : theme.white}; // Adjust dark mode background color
                    color: ${darkMode ? theme.white : theme.darkGrey}; // Adjust dark mode text color
                }

                p {
                    font-family: 'Optima';
                }

                h1,
                h2 {
                    font-family: 'Visuelt';
                    font-weight: bold;
                    line-height: 1;
                    color: ${darkMode ? theme.white : theme.darkGrey};
                }

                h1 {
                    font-size: 45px;
                    margin-bottom: 0px;
                    color: ${darkMode ? theme.white : theme.darkGrey};
                }

                h3,
                h4,
                h5,
                h6,
                a {
                    font-family: 'Visuelt';
                }

                img {
                    -webkit-user-drag: none;
                    -khtml-user-drag: none;
                    -moz-user-drag: none;
                    -o-user-drag: none;
                    user-drag: none;
                }
            `}</style>
            <ThemeProvider theme={theme}>
                <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
                    <head>
                        <title>Derpfi</title>
                        <link rel="icon" href="/favicon.ico" />
                    </head>

                    <Navbar toggleDarkMode={toggleDarkMode}/>
                    <Component {...pageProps} darkMode={darkMode} />
                    <Footer />
                </Layout>
            </ThemeProvider>
        </WagmiConfig>
    );
}
