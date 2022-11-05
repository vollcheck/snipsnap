const SnapList = ({ snaps }) => {
  console.log(snaps);

  if (!snaps || snaps.length === 0) return <p>There is no snaps... (yet!)</p>;
  return (
    <ul>
      {snaps.map((snap, index) => (
        <li>
          <nav aria-label="breadcrumb">
            <ul>
              <li><a href="#">{snap["user/username"]}</a></li>
              <li><a href="#">{snap["snap/name"]}</a></li>
            </ul>
          </nav>
        </li>
      ))}
    </ul>
  );
};

export default SnapList;
