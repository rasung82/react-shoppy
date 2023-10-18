import {useState} from "react";
import Button from "../components/ui/Button";
import {uploadImage} from "../api/uploader";
import {addNewProduct} from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // Upload product image to Cloudinary and get own url.
    // Upload product data to Firebase.
    uploadImage(file)
      .then(url => addNewProduct(product, url)
        .then(result => {
          setSuccess('성공적으로 제품이 추가되었습니다.');
          setTimeout(() => {
            setSuccess('')
          }, 4000)
      }))
      .finally(() => setIsUploading(false))

  };

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    if(name ==='file') {
      setFile(files && files[0]);
      return;
    }
    setProduct(prev => {
      return {...prev, [name]: value}
    })
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'> ✨ {success}</p>}
      {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt=''/> }
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type="file"
          name='file'
          accept='image/*'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ? Number(product.price) : ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='desc'
          value={product.desc ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button
          text={ isUploading ? '업로드중...' : '제품 등록하기!'}
          disabled={isUploading}
        />
      </form>
    </section>
  )
}
