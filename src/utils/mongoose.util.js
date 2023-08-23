const utils = {
    mongoosesToObject(mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject(mongoose) {
        return mongoose.toObject();
    },
};
module.exports = utils;
