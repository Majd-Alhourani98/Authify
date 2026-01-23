const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(mext);
  };
};

module.exports = catchAsync;
