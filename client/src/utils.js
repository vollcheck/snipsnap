export const timeConverter = (timestamp) => {
  const timestamp = new Date(timestamp * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = timestamp.getFullYear();
  const month = months[timestamp.getMonth()];
  const date = timestamp.getDate();
  const hour = timestamp.getHours();
  const min = timestamp.getMinutes();
  const sec = timestamp.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
