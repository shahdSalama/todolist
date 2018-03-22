const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/admin");
const Usermodel = require("../db/users");

var functions = {// user object contains data from ui
	addUser: function (user) {
		var newUser = Usermodel();
		newUser.username = user.username;
		newUser.email = user.email;
		newUser.password = newUser.encryptPassword(user.password);
		newUser.save(function (err) {
			if (err) {
				console.log(err);
			}
			
		});

	},
	addTask: function (req, res) {
		Usermodel.findById(user._id, function (err, user) {
			if (err) {
				return res.json({error: "failed to save"})
			}
			if (user) {
				var task = {}
				if (req.body.taskName) {
					task.taskName = req.body.taskName;
				}
				if (req.body.taskDescription) {
					task.taskDescription = req.body.taskDescription;
				}
				if (req.body.taskDate) {
					task.taskDate = req.body.taskDate;
				}
				if (req.body.taskTime) {
					task.taskTime = req.body.taskTime;
				}
				// function to generate a pry id for every task
				function generateId() {
					return "_" + Math.random().toString(12);
				}
				task.id = generateId();
				user.tasks.push(task);
				user.save(function (error) {
					console.log(error);
					if (error) {
						 
						return res.json({error: "failed to save"});
						
					}
					
					res.json({success: "the task added successfully", user: user});
					return true;
				});
			}
		});
	},
	deleteTask: function (req, res) {
		Usermodel.findById(user._id, function (err, user) {
			if (err) {
				return res.json({error: "failed to delete"});
			}
			if (user) {
				var taskId = req.body.taskId;
				user.tasks.forEach(function (task) {
					if (task.id === taskId) {
						var taskIndex = user.tasks.indexOf(task);
						user.tasks.splice(taskIndex, 1);
						user.save(function (err) {
							if (err) {
								console.log(failed);
								return res.json({error: "failed to delete"});
								
							} else {
								console.log(user.tasks);
								return res.json({success: "task deleted successfully", user: user});
								
							}

						});
					}
				});
			}
		});
	},



updateTask: function (req, res) {
	//console.log(user);
		Usermodel.findById(user._id, function (err, user) {
			if (err) {
				return res.json({error: "failed to update"});
			}
			if (user) {
				var taskId = req.body.taskId;
				user.tasks.forEach(function (task) {
					if (task.id === taskId) {

						//console.log(task);
                        //console.log(task.taskName);
						
						task.taskName =req.body.newTaskName;

						task.taskDescription =req.body.newTaskD;

						task.taskTime =req.body.newTaskTime;

					    task.taskDate =req.body.newTaskDate;

                        user.markModified("tasks");
						user.save(function (err) {
							if (err) {
								console.log(failed);
								return res.json({error: "failed to updaet"});
								
							} else {
								console.log(user.tasks);
								return res.json({success: "task updated successfully", user: user});
								
							}

						});
					}
				});
			}
		});
	}



};



// find user by user id and pass
// add task
// edit task
// del task
module.exports = functions;