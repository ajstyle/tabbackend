// models/task.js

'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ChannelName: { type: String, required: [true, 'A You-tube name is required'] },
    ChannelId: { type: String, maxlength: [50, 'Only 50 characters or less are allowed'] },
    // completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('youtube', schema);