import multer from "multer"
import path from "node:path";

const upload = multer({
  dest:path.resolve(__dirname, '../../public/data/uploads'),
  limits:{fileSize:3e7} 
})

upload.fields([
  {name:'image', maxCount:4}
])
