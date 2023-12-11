const generateRandomString = () => {
  const date = new Date();
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const day = new Date().getDate().toString().padStart(2, '0');

  //   const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const sequence = (Math.random() * 1000).toFixed(3).toString().slice(-3);
  const randomChars = Math.random().toString(36).substr(2, 6);
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}-${randomChars}`;
};

export default generateRandomString;
