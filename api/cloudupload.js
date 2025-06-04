import {v2 as cloudinary} from 'cloudinary'
import {supabase} from '../auth'

cloudinary.config({ 
    cloud_name: 'ddoc87vbi', 
    api_key: process.env.CLOUDINARY_API_TOKEN, 
    api_secret: process.env.CLOUDINARY_TOKEN // Click 'View API Keys' above to copy your API secret
});



export default async function cloudupload(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "It's all your fault method!!" });
    }
    const images = req.body.image

    try {
        const uploadPromises = images.map((image, index) =>
            cloudinary.uploader.upload(image, {
              timeout: 60000,
              public_id: req.body.url.indexOf('/')+`_${index}`, // unique public_id per image
        }))

        const uploadResult = await Promise.all(uploadPromises)


        const { data, error } = await supabase
        .from('images')
        .insert([{ user_id: req.body.uid, url: uploadResult[0]['secure_url'], url1: req.body.url }]);

        if (error) {
        console.error('Insert error:', error);
        } else {
        console.log('Insert successful:', data);
        }


        console.log("Dayum sonnn!!!!")

        console.log()

        res.status(200).json({state: "success dawwgg!!!", url: uploadResult['secure_url']});
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}