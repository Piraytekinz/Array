import getRawBody from 'raw-body'
// https://arrayverse-arrayverse.hf.space/upload

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {

    const rawBody = await getRawBody(req)

    const response = await fetch("https://arrayverse-arrayverse.hf.space/upload", {
        headers: {
            "Authorization": "Bearer " + process.env.HUGGINGFACE_TOKEN,
            "Content-Type": req.headers["content-type"]
        },
        method: "POST",
        body: rawBody
    });
    console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')


    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(buffer));

}

// export default function handler(req, res) {
//     console.log(
//         'why is this happening?'
//     )
//     return res.status(200).json({ message: "Test OK" });
// }
  