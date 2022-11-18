import SnapCard from "./SnapCard";
const SnapList = ({ snaps }) => {
  return (
    <>
      {snaps.length ? (
        snaps.map((snap) => <SnapCard snap={snap} />)
      ) : (
        <p>
          <i>No snaps!</i>
        </p>
      )}
    </>
  );
};

export default SnapList;
