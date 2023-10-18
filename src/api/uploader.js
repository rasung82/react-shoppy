const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/';
const CLOUDINARY_NAME = 'dmsfhclm4';
const CLOUDINARY_PRESET = 'aqg9vpec';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  return fetch(`${CLOUDINARY_URL}${CLOUDINARY_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.url;
    });
}
