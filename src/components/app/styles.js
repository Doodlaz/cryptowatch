import styled from 'styled-components'

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
  max-width: 1200px;
  margin: auto;
  justify-content: space-between;
  padding: 0 24px;
`

export const Table = styled.div`
  flex: 0 0 40%;
  max-width: 40%;
  height: 100%;
  background: #fff;
  border: 1px solid #555;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  
  .head {
    display: flex;
    height: 60px;
    
    .td {
      font-weight: 600;
      background: #dedede;
    }
  }
  
  .body {
    height: 100%;
  }
  
  .td {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 8px;
       
    &_id {
      width: 150px;
    }
  }
  .tr {
    display: flex;
    height: 10%;
    
    &:nth-of-type(even) {
      background: #eee;
    }
    
  }
`
export const Log = styled.div`
  flex: 0 0 58%;
  max-width: 58%;
  height: 100%;
  overflow: auto;
  background: #000;
  color: green;
  padding: 0 16px;
  
  p {
    font-size: 12px;
    font-weight: 300; 
  }
`
