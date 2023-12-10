import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="row mt-2">
      <div className="col">
        Total calories: <strong>900</strong> kcal
      </div>
      <div className="col text-end">
          <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
      </div>
    </div>
  );
};

export default Home;