import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
export const getUsersSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user_id;
        const allUsersFiltered = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(allUsersFiltered)

    } catch (error) {
        console.log("Error in getUsersSidebar", error.message)
        res.status(500).json({ message: "Internal server error" });

    }
}

export const getMassage =async (req, res) =>{
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMassage", error.message)
        res.status(500).json({ message: "Internal server error" });
    
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;

        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();


        //IMPLEMENT  soket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage", error.message)
        res.status(500).json({ message: "Internal server error" });
    
    }
}






