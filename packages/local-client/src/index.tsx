import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import styles from './index.module.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CellList from './containers/CellList/CellList';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <CellList />
      </div>
    </Provider>
  );
};

reactDOM.render(<App />, document.querySelector('#root'));
