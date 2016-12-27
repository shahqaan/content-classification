import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  ArticlesList() {
    return axios.get('/api/v1/articles').then(data => this.setState({articles: data.data}));
  }

  componentDidMount() {
    this.ArticlesList();
  }

  makeKeywords(keywords) {

    let renderedKeywords = keywords.map((keyword, i) => {
      return keyword.keyword;
    });

    return renderedKeywords.join(', ');
  }

  render () {

    let articles = null;

    if (this.state.articles) {
      articles = this.state.articles.map((article, i) => {
        return (<tr key={i} >
          <td>{article.url}</td>
          <td>{this.makeKeywords(article.keywords)}</td>
        </tr>);
      });

    }

    return (<table>
      <tr><th>URL</th><th>Tags</th></tr>
      {articles}
    </table>);


  }
}

render(<App/>, document.getElementById('app'));