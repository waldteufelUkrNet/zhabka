const router          = require('express').Router();
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
let config = require('../../config');
var api = require('../../models/api.js');
// const sharp = require('sharp');
const Jimp = require('jimp');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
    secretAccessKey: config.aws_remote_s3_config.secretAccessKey,
    accessKeyId: config.aws_remote_s3_config.accessKeyId,
});

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: '4ek-storage',
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

router.post('/', uploadS3.single('file'), async (req, res) => {

    return res.json({
        status:"OK", error: null, data: req.file.location
    });
    
});


router.post('/logo', upload.single('file'), async (req, res) => {

    let minimal_requires = {
      square:{
        h: 500,
        w: 500
      },
      rectangular: {
        h: 500,
        w: 1000
      }
    }
    
    var w, h;

    let {type} = req.query;
    if(!type)
      type="rectangular";

    try {
     const image = req.file;
      console.log(image)
     const file = await Jimp.read(Buffer.from(image.buffer, 'base64'))
       .then(async image => {
          w = image.bitmap.width; //  width of the image
          h = image.bitmap.height;
          

          //

         //image.resize(Jimp.AUTO, 900);
         return image.getBufferAsync(Jimp.AUTO);
       })
       .catch(err => {
         console.log("E2")
         res.status(500).json({ msg: 'Server Error', error: err });
       });
 
       console.log(" h "+h+" w "+w)

       if(type === "square" && h !== w)
            return res.status(200).json({ status:"OK", error: null, data: {
                error: "Логотип должен быть квадратным"
              }
          });
       if(minimal_requires[type].h > h || minimal_requires[type].w > w)
            return res.status(200).json({ status:"OK", error: null, data: {
              error: "Логотип должен иметь минимальную высоту "+minimal_requires[type].h+" и минимальную ширину "+minimal_requires[type].w
              }
          });
       const file_150 = await Jimp.read(Buffer.from(image.buffer, 'base64'))
       .then(async image => {
         image.resize(Jimp.AUTO, 150);
         return image.getBufferAsync(Jimp.AUTO);
       })
       .catch(err => {
         console.log("E2")
         res.status(500).json({ msg: 'Server Error', error: err });
       });

       const file_500 = await Jimp.read(Buffer.from(image.buffer, 'base64'))
       .then(async image => {
         image.resize(Jimp.AUTO, 500);
         return image.getBufferAsync(Jimp.AUTO);
       })
       .catch(err => {
         console.log("E2")
         res.status(500).json({ msg: 'Server Error', error: err });
       });

       const new_name = Date.now().toString() + '-'+image.originalname;
       const s3FileURL = "https://4ek-storage.s3.eu-central-1.amazonaws.com/";

     const params = {
       Bucket: '4ek-storage',
       Key: new_name,
       Body: file,
       ContentType: image.mimetype,
       ACL: 'public-read'
     };
     const params_150 = {
        Bucket: '4ek-storage',
        Key: "150_"+new_name,
        Body: file_150,
        ContentType: image.mimetype,
        ACL: 'public-read'
      };
   
      const params_500 = {
        Bucket: '4ek-storage',
        Key: "500_"+new_name,
        Body: file_500,
        ContentType: image.mimetype,
        ACL: 'public-read'
      };
   
      s3.upload(params_150, async (err, data) => {});
      s3.upload(params_500, async (err, data) => {});
     s3.upload(params, async (err, data) => {
       try {
         if (err) {
             console.log("E3")
           res.status(500).json({ error: true, Message: err });
         } else {
           
             return res.json({
                 status:"OK", error: null, data: {
                     original: s3FileURL+new_name,
                     medium: s3FileURL+"500_"+new_name,
                     small: s3FileURL+"150_"+new_name
                 }
             });
         }
       } catch (err) {
         console.log("E4")
         res.status(500).json({ msg: 'Server Error', error: err });
       }
     });
   } catch (err) {
       console.log("E5", err)
     res.status(500).json({ msg: 'Server Error', error: err });
   }
     
 });
 
router.delete('/', async (req, res) => {
    if(!req.input_user || !req.input_user.user)
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.query || !req.query.file)
        return res.json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS'});

    return res.json({
        status:"OK", error: null, data: {}
    });

/*    s3.deleteObject({
        Bucket: '4ek-storage',
        Key: req.query.file
    }, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log();

        return res.json({
            status:"OK", error: null, data: {}
        });
    });*/
});

module.exports = router;