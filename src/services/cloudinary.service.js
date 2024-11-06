
export const uploadImg = async (ev) => {
    // Defining our variables
    // const CLOUD_NAME = 'insert1'
    const CLOUD_NAME = 'dsymwlagn'
    // const UPLOAD_PRESET = 'insert2'
    const UPLOAD_PRESET = 'toy_uploads'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData()
  
  
    // Bulding the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  
  
    // Sending a post method request to Cloudinarys API
    try {
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: FORM_DATA,
      })
      const { url } = await res.json()  
      return url   
  } catch (err){
    console.log('failed to upload img', err)
  }
}
  
  
  