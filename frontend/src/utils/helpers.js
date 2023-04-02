export const checkIfAtLeaseOneSourceIsTrue = (sources) => {
  for (let source in sources) {
    if (sources[source]) {
      return true;
    }
  }
  return false;
};

export const imageUrl = (path) => {
  return `${process.env.REACT_APP_BACKEND_URL}/${path}`;
};
