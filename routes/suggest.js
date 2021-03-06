var data = require('../data.json');

exports.view = function(req, res) { 
	var user_data = JSON.parse(JSON.stringify(data));
	delete user_data.users;
	user_data.guest = req.session.guest;

	var goto_welcome = true;
	if(req.session.user != "" && req.session.user != null)
		goto_welcome = false;
	else if(req.session.guest) // explicitly browse as guest
		goto_welcome = false;
	if(goto_welcome){
		res.render('welcome');
		return;
	}

	// retrieving user information
	if(req.session.user != "" && req.session.user != null) {
		if(req.session.name != "" && req.session.name != undefined && req.session.name != null)
			user_data["name"] = req.session.name; else user_data["name"] = req.session.user;
		for (i = 0; i < data["users"].length; i++)
			if (data["users"][i]["name"] == req.session.user) {
				user_data["days"] = JSON.parse(JSON.stringify(data["users"][i]["days"]));
				user_data.actual = data.users[i].actual;
			}
	}

	user_data["page_suggestions"] = true;
	res.render('suggest', user_data);
 }