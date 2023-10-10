export default function Button({ text, onClick }) {
  return (
    <button
      className='bg-brand text-white py-2 px-4 rounded-sm hover:brightness-100'
      onClick={onClick}>{text}</button>
  )

}
