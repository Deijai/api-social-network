"use strict";
const User = require("../models/User");
const bcrypt = require('bcrypt-nodejs');

const test = (req, res) => {
  res.json({ ok: true });
};

const save = async (req, res) => {
  const { user } = req.body;
  

  
    try {
        
  if ((user.name && user.surname && user.email && user.password && user.nick && user.role)) {
       const data = new User(user);

       const userExists = await User.findOne({ $or: [
        {email: user.email},
        {nick: user.nick}
       ]});

       console.log('userExists', userExists);

       if(userExists){
        return res.status(500).json({ error: 'There is already a user with that email, check'});
       }

       bcrypt.hash(user.password, null, null, (err, hash) => {
            data.password = hash;
            data.save( (err, userStored) => {
                console.log('userStored', userStored);
                if(err){
                    return res.status(500).json({ error: err});
                }

                if(userStored){
                    return res.status(200).json({ user: userStored});
                } else {
                    return res.status(404).json({ error: 'User not created'});
                }

            });
       });
    }

   

    } catch (error) {
        return res.status(401).json({ error: error});
    }

};

module.exports = {
  test,
  save,
};
