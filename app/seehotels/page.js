import React from "react";

const hotels = [
  {
    id: 1,
    name: "The Grand Palace",
    location: "Mumbai, Maharashtra",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllUoyPHy6w6-5eu09nnyFMWEiqvzK8aB4DA&s",
    description: "Luxury stay with sea view and top amenities.",
  },
  {
    id: 2,
    name: "Hilltop Resort",
    location: "Manali, Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    description: "Surrounded by beautiful hills and snow-capped peaks.",
  },
  {
    id: 3,
    name: "Beach View Hotel",
    location: "Goa, India",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0b/6a/1f/de/property-view.jpg",
    description: "Perfect for beach lovers and parties.",
  },
  {
    id: 4,
    name: "Essentia Luxury Hotel",
    location: "Indore, Madhya Pradesh",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345742266.jpg?k=fb33c11240d6cebb94cb34bd6c68196f859be21e4e3cd306b80006a5bf389dfc&o=&hp=1",
    description: "Perfect hotels with comfort & luxury.",
  },
  {
    id: 5,
    name: "Taj Lakefront Hotel",
    location: "Bhopal, Madhya Pradesh",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/327168421.jpg?k=5d0dedc881f0a88cac3ec41c874195cbda876a86fe2449e917f120280a092905&o=&hp=1",
    description: "Looking so beautiful.",
  },
  {
    id: 6,
    name: "Purple Orchid Hotel",
    location: "Ambikapur, Chhattisgarh",
    image:
      "https://content.jdmagicbox.com/comp/ambikapur/m1/9999p7774.7774.211127115510.j7m1/catalogue/hotel-purple-orchid-ambikapur-hotels-1u3c6yhrxc.jpg",
    description: "Comfortable stay in Ambikapur.",
  },
  // ✅ Adding 10 new hotels from different states
  {
    id: 7,
    name: "Leela Palace",
    location: "Udaipur, Rajasthan",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/77/15/9a/photo0jpg.jpg?w=1200&h=700&s=1",
    description: "Royal luxury stay near Lake Pichola.",
  },
  {
    id: 8,
    name: "ITC Kakatiya",
    location: "Hyderabad, Telangana",
    image:
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels-listing/hotels-listing-card/itc-kaktiya.png",

    description: "Elegant hotel with fine dining and heritage interiors.",
  },
  {
    id: 9,
    name: "The Oberoi",
    location: "New Delhi, Delhi",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/44522456.jpg?k=9947bae2627f2fc1ec561c4284d877d0cddcad32a7e4b3716a84a115b29ee8ff&o=&hp=1",

    description: "Luxury redefined in the heart of Delhi.",
  },
  {
    id: 10,
    name: "Mayfair Lagoon",
    location: "Bhubaneswar, Odisha",
    image:
      "https://assets.simplotel.com/simplotel/image/upload/x_0,y_111,w_2756,h_1550,r_0/q_80,w_900,h_506,dpr_1,f_auto,fl_progressive,c_limit/mayfair-lagoon-bhubaneswar/P_RPX2944_e1r0ny",
    description: "A peaceful luxury retreat with greenery and lagoons.",
  },
  {
    id: 11,
    name: "Vivanta by Taj",
    location: "Kochi, Kerala",
    image: "https://gos3.ibcdn.com/f441f4ae-1fd4-469d-99dc-630a820e1165.jpg",
    description: "Modern luxury stay with backwater views.",
  },
  {
    id: 12,
    name: "Radisson Blu",
    location: "Guwahati, Assam",
    image:
      "https://pix10.agoda.net/hotelImages/706/706482/706482_15061117190029315014.jpg?ca=4&ce=1&s=414x232",
    description: "A premium stay surrounded by tea gardens.",
  },
];

export default function Page() {
  return (
    <div className="bg-blue-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
        Welcome to Our Hotels
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={hotel.image}
              alt={`Hotel: ${hotel.name}`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-800">{hotel.name}</h2>
              <p className="text-gray-500">{hotel.location}</p>
              <p className="mt-2 text-gray-700">{hotel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
