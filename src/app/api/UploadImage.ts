// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "POST") {
//     const form = new formidable.IncomingForm({
//       uploadDir,
//       keepExtensions: true,
//     });
//     form.uploadDir = path.join(process.cwd(), "public/uploads");
//     form.keepExtensions = true;

//     form.parse(req, (err: any, fields: any, files: { image: any }) => {
//       if (err) {
//         res.status(500).json({ error: "Error uploading file" });
//         return;
//       }

//       const file = files.image as formidable.File;
//       const fileName = file.newFilename;
//       const url = `/uploads/${fileName}`;

//       res.status(200).json({
//         success: 1,
//         file: {
//           url,
//         },
//       });
//     });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
