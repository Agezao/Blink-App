import React from 'React';
import { ListView, Row, Card, Screen, Caption, Spinner } from '@shoutem/ui';
//

class Loader extends React.Component {
  render() {
    return(
      <Card style={{flexDirection: 'column', alignItems: 'center', width: '90%', marginLeft: '5%', padding: 10, marginTop: 5}}>
        <Spinner />
        <Caption>Buscando dados</Caption>
      </Card>
    );
  }
}

export default Loader;