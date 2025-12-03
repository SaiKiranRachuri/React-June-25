import Spinner from "./Spinner";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return <ul className={StyleSheet}>{}</ul>;
}

export default CityList;
