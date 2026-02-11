const Card = ({ children, headerSlot, className }) => {
  return <div className={`${className || ''} card border border-zinc-300 dark:border-zinc-700 bg-[#efefef] dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-xl lg:p-6 p-4 transition-colors duration-300`}>
    <>{headerSlot}</>
    <section>
      {children}
    </section>
  </div>
}
export default Card
