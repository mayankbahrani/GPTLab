import express, { response } from "express";
import Thread from "../models/Thread.js";
import { getDefaultHighWaterMark } from "stream";
import { error } from "console";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

//test 
router.post("/test" , async(req,res)=>{
    try{
        const thread = new Thread({
            threadId:"xyz",
            title:"Testing new Thread3"
        });
        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.send(response);

    }
})

//get all threads
router.get("/thread" , async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        //descending order
        res.json(threads);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

//get one thread
router.get("/thread/:threadId" , async(req,res)=>{
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error:"Thread not found"});
        }
        res.json(thread.messages);



    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch thread"});
    }
})

//delete one thread
router.delete("/thread/:threadId", async(req,res)=>{
    const {threadId} = req.params;

    try{
        const deleted =await Thread.findOneAndDelete({threadId});

        if(!deleted){
            res.status(400).json({error:"Thread could not be deleted"});
        }

        res.status(200).json({success:"Thread deleted succesfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete a chat"});
    }
})

//actual chat part
router.post("/chat" , async(req,res)=>{
    const {threadId , message} = req.body;

    if(!threadId || !message){
        res.status(400).json({error:"missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create a new thread in db
            thread = new Thread({
                threadId: threadId,
                title:message,
                message:[{
                    role:"user",
                    content:message
                }]

            });


        }else{
            thread.messages.push({role:"user", content:message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role:"assistant", content:assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply:assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong"});
    }
})



export default router;