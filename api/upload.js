import {v2 as cloudinary} from 'cloudinary'
import {supabase} from '../auth'

cloudinary.config({ 
    cloud_name: 'ddoc87vbi', 
    api_key: '851521446773947', 
    api_secret: process.env.CLOUDINARY_TOKEN // Click 'View API Keys' above to copy your API secret
});



export default async function cloudupload(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "It's all your fault method!!" });
    }

    try {
        const uploadResult = await cloudinary.uploader
        .upload(
            req.body.image, {
                timeout: 60000,
                public_id: 'digitized',
            }
        )
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });


        console.log("Dayum sonnn!!!!")

        console.log()

        res.status(200).json({state: "success dawwgg!!!", url: uploadResult['secure_url']});
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}