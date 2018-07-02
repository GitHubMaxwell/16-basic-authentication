export default (res) => {
  res.statusCode = 404;
  res.statusMessage = 'not found';
  res.setHeader('Content-Type', 'application/json');
  res.end();
};