import React from "react";

export default function Page() {
  const imageClass =
    "w-[300px] h-[300px] object-cover m-2 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105";

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-fuchsia-600 flex justify-center text-5xl font-bold">
        OVERAUTO
      </h1>
      <div className=" mt-15 flex flex-wrap justify-center">
        <img
          className={imageClass}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX07efmN7j4AdSPHeSX4VuKMipDLw7EZjMuw&s"
          alt="img1"
        />
        <img
          className={imageClass}
          src="https://thumbs.dreamstime.com/b/indian-auto-rickshaw-passenger-234339317.jpg"
          alt="img2"
        />

        <img
          className={imageClass}
          src="https://www.shutterstock.com/image-photo/profile-side-view-portrait-beautiful-260nw-2148238991.jpg"
          alt="img3"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2447341349/display_1500/stock-vector-luxury-elegant-super-car-automobile-urban-design-background-premium-black-silver-metallic-shine-2447341349.jpg"
          alt="img4"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2391802981/display_1500/stock-photo-white-car-drive-on-mountain-road-landscape-in-winter-nature-scenery-on-highway-in-green-mountains-2391802981.jpg"
          alt="img5"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2051440676/display_1500/stock-photo-the-whole-family-is-driving-for-the-weekend-mom-and-dad-with-their-daughter-and-a-labrador-dog-are-2051440676.jpg"
          alt="img6"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2456987857/display_1500/stock-photo-instant-photo-photo-of-auto-insurance-2456987857.jpg"
          alt="img7"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2446453535/display_1500/stock-photo-isometric-view-of-electric-vehicles-parked-at-charging-station-bus-truck-auto-rickshaw-car-2446453535.jpg"
          alt="img8"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2522457521/display_1500/stock-photo-competicion-autos-formula-2522457521.jpg"
          alt="img9"
        />
        <img
          className={imageClass}
          src="https://www.shutterstock.com/shutterstock/photos/2550116367/display_1500/stock-photo--d-render-of-a-classic-mumbai-auto-rickshaw-in-black-and-yellow-with-a-driver-in-a-brown-uniform-2550116367.jpg"
          alt="img10"
        />
      </div>
    </div>
  );
}
