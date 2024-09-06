export default function Button({ icon, children, className, text, onClick }) {
  return (
    <button onClick={onClick} className={`${className}  game-button orange `}>
      <div className='absolute inset-0 flex items-center justify-center lg:gap-4 '>
        <div>{icon}</div>
        <div className='absolute text-sm top-1 start-2 '>{children}</div>
        <h1 className='hidden md:flex'>{text}</h1>
      </div>
    </button>
  );
}
