const Loader = ({ message }) => {
  return (
    <div>
      <p>{message ? message : 'Loading...'}</p>
    </div>
  );
};

export default Loader;
