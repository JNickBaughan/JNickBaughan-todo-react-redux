import React from 'react';
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        
axios({
  url: '/graphql',
  method: 'get',
  data: {
    query: `
      query PostsForAuthor {
        author(id: 1) {
          firstName
            posts {
              title
              votes
            }
          }
        }
      `
  }
}).then((result) => {
  console.log(result.data)
});
    }

    render() {
      return (
        <div>
          <h1>GraphQL Base</h1>
          
        </div>
      );
    }
  }

  export default App;

