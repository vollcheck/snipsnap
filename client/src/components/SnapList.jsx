import SnapCard from "./SnapCard";
const SnapList = ({ snaps }) => {
  return (
    <>
      {snaps.length ? (
        snaps.map((snap, index) => <SnapCard snap={snap} index={index} />)
      ) : (
        <p>
          <i>No snaps!</i>
        </p>
      )}
    </>
  );
};

export default SnapList;
