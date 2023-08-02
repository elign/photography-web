export default function Hero() {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/kyroswebsite.appspot.com/o/portfolio%2FU%20%26%20K%20SP%2034%20copy.jpg?alt=media&token=f2fd5625-4156-4fb4-b285-b101bf0a3927)"
      }}
      className="bg-fixed h-screen bg-center md:h-screen lg:h-screen bg-cover py-10 md:py-40 bg-transparent dark:bg-gray-900"
    >
      <div className="drop-shadow -mt-30 py-64 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-48">
        <h1 className="stroke-slate-50 stroke-2 mb-4 py-3 text-4xl font-bold tracking-tight leading-none text-white sm:px-16 xl:px-48 md:text-5xl lg:text-6xl dark:text-white">
          Kyros Pictures
        </h1>
        <p className="mb-8 text-center text-lg md:text-center font-thin text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Remember your special moments forever
        </p>
      </div>
    </section>
  );
}
