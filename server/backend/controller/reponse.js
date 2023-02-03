import {db} from "../db.js"
import jwt from "jsonwebtoken";
import moment from "moment";


export const getreponses = (req,res) => {
   
    const q=`SELECT c.*, u.id_user AS userId, username FROM reponse AS c JOIN users AS u ON (u.id_user = c.id_user)
    WHERE c.id_question = ? ORDER BY c.date_reponse DESC`;
    db.query(q, [req.query.id_question], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });

   
}

/*export const addreponse = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");
       
   const q = "INSERT INTO reponse(`id_question`,`id_user`,`date_reponse`,`detail_reponse`) VALUES (?)";
   
   const values = [
    
      req.body.id_question,
       userInfo.id_user,
       moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
       req.body.detail_reponse,
   ]

   db.query(q,[values],(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
   })
})
    
}*/

export const addreponse = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO reponse(`id_question`,`id_user`,`date_reponse`,`detail_reponse`) VALUES (?)";
      const values = [
        req.body.id_question,
        userInfo.id_user,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.detail_reponse
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
      });
    });
  };


export const deletereponse = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");

   const q = "DELETE  FROM reponse WHERE id_reponse=?  and id_user=?";
   
   db.query(q,[
    req.params.id_reponse,
        userInfo.id_user
],
(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
   })
})
}

export const updatereponse = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");

   const q = "UPDATE reponse SET date_reponse=? , detail_reponse=? where (id_reponse=?  and id_user=?)";
   const values = [
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
       req.body.detail_reponse,
       req.params.id_reponse,
       userInfo.id_user
   ]
   db.query(q,values,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
   })
})
}
