const apiModelTransform = (doc, ret /* options */) =>
  Object.keys(ret)
    .filter(key => !['__v', '_id'].includes(key))
    .reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]: ret[key]
        }),
      { id: ret._id.toString() }
    );

module.exports = {
  apiModelTransform
};
