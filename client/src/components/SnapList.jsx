import SnapCard from "./SnapCard";

const SnapList = ({ snaps }) => {
  return (
    <>
      {snaps.length ? (
        snaps.map((snap, index) => <SnapCard snap={snap} key={index} />)
      ) : (
        <p>
          <i>No snaps!</i>
        </p>
      )}
    </>
  );
};

export default SnapList;
