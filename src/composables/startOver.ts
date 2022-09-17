const getStartOver = () => {
  const clear = localStorage.clear();
  const reload = location.reload();

  return { clear, reload };
}
export default getStartOver;