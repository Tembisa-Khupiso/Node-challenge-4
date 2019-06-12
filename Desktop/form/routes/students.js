const express = require('express');
const router = express.Router();

// Bring in Student Model
let Student = require('../models/student');

// 
router.get('/add', (req, res) => {
    res.render('add_student', {
        title: 'Add Students'
    });
});

// Add Submit POST Route
router.post('/add', (req, res) => {
   req.checkBody('fname', 'Your Name is Required').notEmpty();
   req.checkBody('surname', 'Your Surname is Required').notEmpty();
   req.checkBody('age', 'Your Age is Required').notEmpty();
   req.checkBody('subject', 'Subject is Required').notEmpty();
   req.checkBody('admin', 'The name of admin is Required').notEmpty();

   // Get Errors
   let errors = req.validationErrors();
   if(errors){
        res.render('add_student', {
            title: 'Add Students',
            errors:errors
        });
   } else {
    let student = new Student();
    student.fname = req.body.fname;
    student.surname = req.body.surname;
    student.age = req.body.age;
    student.subject = req.body.subject;
    student.admin = req.body.admin;
 
    student.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Student Added');
            res.redirect('/');
        }
    });
   }
});

// Load Edit Form
router.get('/edit/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        res.render('edit_student', {
            title: 'Edit Student Info',
           student:student
        });
    });
});

// Update Submit POST Route
router.post('/edit/:id', (req, res) => {
    let student = {};
    student.fname = req.body.fname;
    student.surname = req.body.surname;
    student.age = req.body.age;
    student.subject = req.body.subject;
    student.admin = req.body.admin;
 
    let query = {_id:req.params.id}

    Student.update(query, student, (err) => {
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Student Info Updated');
            res.redirect('/');
        }
    });
 });

// Delete Student
router.delete('/:id', (req, res) => {
    let query = {_id:req.params.id}

    Student.remove(query, (err) => {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

// Getting Single Student
router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        res.render('student', {
           student:student
        });
    });
});

module.exports = router;