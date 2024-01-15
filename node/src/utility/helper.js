Array.prototype.restructureErrors = function () {
  try {
    const errors = [];

    for (const item of this) {
      errors.push({
        field: item.path.shift(),
        message: item.message.replaceAll('"', ""),
      });
    }

    return errors;
  } catch (error) {
    return false;
  }
};

module.exports = {
  ResponseObject: (res, obj) => {
    return res.status(obj.status).send({
      status: obj.status,
      success: obj.success,
      message: obj.message,
      data: obj.data,
    });
  },
};
