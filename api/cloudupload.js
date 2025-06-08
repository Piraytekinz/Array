import {v2 as cloudinary} from 'cloudinary'
import {supabase} from './userData.js'

cloudinary.config({ 
    cloud_name: 'ddoc87vbi', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_TOKEN // Click 'View API Keys' above to copy your API secret
});



export default async function cloudupload(req, res) {

    const images = req.body.image

    try {
        const idx = req.body.url.lastIndexOf('/')+1
        const uploadPromises = images.map((image, index) =>
            cloudinary.uploader.upload(image, {
              timeout: 60000,
              public_id: req.body.url.slice(idx)+`_${index}`, // unique public_id per image
        }))
        // .catch((error) => {
        //     console.log(error);
        //     res.status(500).json({ error: "Server error" });
        //     return
        // });

        const uploadResult = await Promise.all(uploadPromises)



        console.log("Dayum sonnn!!!!")

        console.log(uploadResult)



        const { data, error } = await supabase
        .from('images')
        .insert([{ user_id: req.body.uid, url: uploadResult[0]['secure_url'], url1: uploadResult[1]['secure_url'] }]);

        if (error) {
        console.error('Insert error:', error);
        } else {
        console.log('Insert successful:');
        }



        res.status(200).json({state: "success dawwgg!!!", url: uploadResult[0]['secure_url']});
    } catch (err) {
        console.log("THIS IS THE ERROR", err)
        res.status(500).json({ error: "Server error" });
    }
}