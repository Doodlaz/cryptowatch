import React, { useEffect } from "react";
import io from 'socket.io-client';

import { Wrap } from './styles'

const API_KEY = 'XT11G0PE8VX02ZZ49RUR';
const uri = 'wss://stream.cryptowat.ch/connect?apikey='+API_KEY;


const socket = io(uri);

const App = () => {


  useEffect(() => {

    socket.on('message', payload => {
      console.log({ payload })
    });
  });

  console.log(socket);

  return (
    <Wrap>
      qwe
    </Wrap>
  )
}
export default App


