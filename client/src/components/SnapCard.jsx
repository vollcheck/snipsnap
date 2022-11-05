const SnapCard = ({snap}) => {
  console.log(snap);

  if (!snap || snap.length === 0) return <p>There is no snap... (yet!)</p>;
  return (
    <table role="grid">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Content</th>
          <th>Author</th>
          <th>Language</th>
          <th>Last update</th>
        </tr>
        <tr>
          <td>{snap["snap/id"]}</td>
          <td>{snap["snap/name"]}</td>
          <td>
            <code>{snap["snap/content"]}</code>
          </td>
          <td>{snap["user/username"]}</td>
          <td>{snap["language/name"]}</td>
          <td>{snap["snap/update_date"]}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SnapCard;
