
exports.index = function (req, res) {
  res.render('index', {
    title: 'authLittle',
    user: req.user
  });
};
