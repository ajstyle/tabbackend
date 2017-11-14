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

router.route('/Channel/:id')
    .get((req, res) => {
        youtube.findById(req.params.id, (err, task) => {
            if (err) {
                return res.send(err);
            }
            return res.json(task);
        });
    })
    .put((req, res) => {
        youtube.findByIdAndUpdate(req.params.id, {
            ChannelName: req.body.ChannelName,
            ChannelId: req.body.ChannelId
        }, (err) => {
            if (err) {
                return res.send(err);
            }
            return res.json({ message: 'Channel updated successfully' });
        });
    })
    .delete((req, res) => {
        youtube.remove({ _id: req.params.id }, (err) => {
            if (err) {
                return res.send(err);
            }
            return res.json({ message: 'Task has been removed!' });
        });
    })






module.exports = router;