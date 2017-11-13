// routes/task.js

'use strict'

const express = require('express');

const youtube = require('../models/youtube');

const router = express.Router();

// routes ending with /todos
router.route('/Channel')
    .post((req, res) => {
        console.log(req.body);
        console.log(req.body.ChannelName);
        const task = new youtube({
            ChannelName: req.body.ChannelName,
            ChannelId: req.body.ChannelId
        });

        task.save((err) => {
            if (err) {
                return res.send(err);
            }

            return res.json({ message: 'New task created!' });
        });

    }).get((req, res) => {
        youtube.find({}).sort({ createdAt: -1 })
            .exec((err, task) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(task);
            });
    })

module.exports = router;