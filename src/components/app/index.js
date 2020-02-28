import React, { useState } from "react"
import { format } from "date-fns"

//styles
import { Wrap, Log, Table } from './styles'

//web socket
const socket = new WebSocket('wss://stream.cryptowat.ch/connect?apikey=9YFF48Q8AIBBN6KM1YIX')

const App = () => {

  const [loading, setloading] = useState(true)
  const [log, setLog] = useState([])
  const [data, setData] = useState([])

  const subscribeTo = (socket, res) => {
    socket.send(JSON.stringify({
      subscribe: {
        subscriptions: res.map( res => ({ streamSubscription: { resource: res } }))
      }
    }))
  }

  const formatData = data => {
    if (data.marketUpdate && data.marketUpdate.tradesUpdate) {
      for (let trade of data.marketUpdate.tradesUpdate.trades) {
        const id = data.marketUpdate.market.marketId
        const date = format(new Date(trade.timestampNano/1000000), 'iii, dd MMM yyyy HH:mm:ss')
        const price = trade.priceStr
        const amount = trade.amountStr
        const newData = { // new data row
          id: id,
          price: price,
          amount: amount
        }

        setData(oldData =>
          [newData, ...(oldData.length < 10 ? oldData : oldData.splice(0, oldData.length - 1))]
        ) //add table row to data array

        setLog(oldLog =>
          [`BTC/USD trade on market ${id}: ${date} GMT ${price} USD ${amount} btc`, ...oldLog]
        ) //add new log to log array
      }
    }
  }

  const blobAsText = (e, reader) => {
    const data = JSON.parse(e.srcElement.result.toString())

    formatData(data)

    return reader.removeEventListener('loadend', blobAsText)
  }

  socket.onopen = () => {
    subscribeTo(socket, ['instruments:9:trades'])
  }

  socket.onmessage = (msg) => {
    const reader = new FileReader()

    setloading(false)

    reader.readAsText(msg.data)

    reader.addEventListener('loadend', e => blobAsText(e, reader))
  }

  return loading
    ?
      <img className={'loader'} src={'https://clipartmag.com/assets/img/loading.gif'} />
    :
    <Wrap>
      <Table>
        <div className={ 'head' }>
          <div className={ 'td td_id' }>ID</div>

          <div className={ 'td' }>Price</div>

          <div className={ 'td' }>Amount BTC</div>
        </div>

        <div className={ 'body' }>
          { data && data.map(( item, index ) => (
            <div key={ index } className={ 'tr' }>
              <div className={ 'td td_id' }>{ item.id }</div>

              <div className={ 'td' }>{ item.price }</div>

              <div className={ 'td' }>{ item.amount }</div>
            </div>
          ))}
        </div>

      </Table>
      <Log>{ log && log.map(( item, index ) => (<p key={ index }>{ item }</p>))}</Log>
    </Wrap>

}
export default App





