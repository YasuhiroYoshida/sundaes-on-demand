const Loader = ({ message }) => {
  return (
    <div>
      <span>{message ? message : 'Loading...'}</span>
    </div>
  );
};

export default Loader;
