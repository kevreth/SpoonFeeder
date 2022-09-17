// const reloadPage = () => {
//   localStorage.clear();
//   location.reload();
// }
// export default reloadPage;

const getStartOver = () => {
  const clear = localStorage.clear();
  const reload = location.reload();

  return { clear, reload };
}
export default getStartOver;