const axios = require('axios')
const sizeOf = require('image-size')

const GetPhotos = async (req, res) => {
  try {
    const flickr_response = await axios.get("https://www.flickr.com/services/feeds/photos_public.gne?format=json")
    
    let photos;
    photos = flickr_response.data
    // remove prefix 'jsonFlickrFeed' from flickr APi
    photos = photos.substring(15)
    photos = photos.substring(0, photos.length - 1)
    // Parse JSON from string
    photos = JSON.parse(photos)

    // Looping photos.items because we need to modify object
    photos.items = await Promise.all(photos.items.map(async item => {
      // Get buffer of each image
      const response = await axios.get(item.media.m, {
        responseType: 'arraybuffer'
      })
      const buffer = Buffer.from(response.data, 'binary')
      // Get size of each image
      const size = sizeOf(buffer)

      // Modify item objects
      item.src = item.media.m
      item.width = size.width
      item.height = size.height

      return item
    }))

    // Give response 
    res.json({
      status: 1,
      status_code: 200,
      message: 'Successfully retrieved data',
      data: {
        paging: {
          total: photos.items.length
        },
        photos
      }
    })
  } catch (e){
    // Give error response
    res.status(500).json({
      status: 0,
      status_code: 500,
      message: e.message
    })
  }
}

module.exports = { GetPhotos }
