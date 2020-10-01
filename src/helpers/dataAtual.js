module.exports = () => {
  const data = new Date();
  return (`${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`);
};