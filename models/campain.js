const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: String,
    budget: Number,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Campaign', campaignSchema);