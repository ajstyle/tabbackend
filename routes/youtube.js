// routes/task.js

'use strict'
const uuidv1 = require('uuid/v1');
const express = require('express');
const cors = require('cors');
const youtube = require('../models/youtube');

const router = express.Router();
var app = express()

app.use(cors());
router.all("*", cors());
// routes ending with /todos
router.route('/Channel')
    .post((req, res) => {
        console.log(req.body);
        console.log(req.body.ChannelName);
        console.log("--------------------", uuidv1());
        const task = new youtube({
            ChannelName: req.body.ChannelName,
            ChannelId: req.body.ChannelId
        });
        console.log("--------------------", task);
        task.save((err, data) => {
            if (err) {
                return res.send(err);
            }


            return res.json({ result: data, message: 'Add Channel successfully' });
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
        }, (err, data) => {
            if (err) {
                return res.send(err);
            }
            console.log("Put data", data);
            return res.json({ result: data, message: 'Channel updated successfully' });
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