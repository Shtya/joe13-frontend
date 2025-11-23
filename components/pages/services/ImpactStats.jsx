export default function ImpactStats({data , locale}) {

  return (
    <section className="py-[70px] ">
      <div className=" text-center">
        <h2 data-aos="fade-up"  className="text-xl md:text-4xl font-bold mb-4"> {data?.title?.[locale]} </h2>
        <p  data-aos="fade-up" data-aos-delay={`100`} className="text-base text-gray-400 max-w-2xl mx-auto mb-12"> {data?.subTitle?.[locale]} </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.statics.map((stat, index) => (
            <div data-aos="fade-up" data-aos-delay={`${index + 2}00`} key={index} className=" w-full  btn-blue-3d p-6 lg:py-[20px] lg:p-2 rounded-xl " >
              <h3 className="text-sm md:text-base  mb-2">{stat?.name?.[locale]}</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                {stat.count}
              </div>
              <p className="text-white/70 text-xs md:text-sm">{stat?.desc?.[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
