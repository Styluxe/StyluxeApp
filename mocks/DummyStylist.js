export const dummyStylistDetail = {
  id: 1,
  name: "Hanny's Stylist",
  type: "Wedding Stylist",
  online_status: "Available",
  rating: 5,
  price: "132.000",
  about:
    "Lorem ipsum dolor sitet consectetur adipisicing elit. Lorem ipsum dolor sitet consectetur adipisicing elit. Eum laudantium ipsummaiores iusto est voluptates consequatur nobis obcaecati quas eaque expedita vitae sequi unde et, tenetur voluptatibus asperiores! Quis, voluptatum!",
  images: [
    {
      id: 1,
      image_url:
        "https://media.voguebusiness.com/photos/5d9746ff4f244c00081cd1df/2:3/w_2560%2Cc_limit/stylists-oct-credit-nat-michelle-month-19-article.jpg",
    },
  ],
  schedule: [
    {
      id: 1,
      day: "Monday",
      times: [
        {
          time: "10:00",
          status: "unavailable",
        },
        {
          time: "11:00",
          status: "available",
        },
        {
          time: "12:00",
          status: "available",
        },
        {
          time: "13:00",
          status: "available",
        },
        {
          time: "14:00",
          status: "available",
        },
        {
          time: "15:00",
          status: "available",
        },
        {
          time: "16:00",
          status: "available",
        },
        {
          time: "17:00",
          status: "available",
        },
        {
          time: "18:00",
          status: "available",
        },
        {
          time: "19:00",
          status: "available",
        },
        {
          time: "20:00",
          status: "available",
        },
      ],
    },
    {
      id: 2,
      day: "Tuesday",
      times: [
        {
          time: "10:00",
          status: "unavailable",
        },
        {
          time: "11:00",
          status: "available",
        },
        {
          time: "12:00",
          status: "available",
        },
        {
          time: "13:00",
          status: "available",
        },
        {
          time: "14:00",
          status: "available",
        },
        {
          time: "15:00",
          status: "available",
        },
        {
          time: "16:00",
          status: "available",
        },
        {
          time: "17:00",
          status: "available",
        },
        {
          time: "18:00",
          status: "available",
        },
        {
          time: "19:00",
          status: "available",
        },
        {
          time: "20:00",
          status: "available",
        },
      ],
    },
    {
      id: 3,
      day: "Wednesday",
      times: [
        {
          time: "10:00",
          status: "unavailable",
        },
        {
          time: "11:00",
          status: "available",
        },
        {
          time: "12:00",
          status: "available",
        },
        {
          time: "13:00",
          status: "available",
        },
        {
          time: "14:00",
          status: "available",
        },
      ],
    },
    {
      id: 4,
      day: "Thursday",
      times: [
        {
          time: "10:00",
          status: "unavailable",
        },
        {
          time: "11:00",
          status: "available",
        },
        {
          time: "12:00",
          status: "available",
        },
      ],
    },
    {
      id: 5,
      day: "Friday",
      times: [
        {
          time: "10:00",
          status: "unavailable",
        },
        {
          time: "11:00",
          status: "available",
        },
      ],
    },
    {
      id: 6,
      day: "Saturday",
      times: [],
    },
    {
      id: 7,
      day: "Sunday",
      times: [],
    },
  ],
  customer_review: [
    {
      id: 1,
      name: "Jane Doe",
      image_url:
        "https://akcdn.detik.net.id/community/media/visual/2023/07/13/selfie-untuk-perawatan-dirifoto-freepikcomlookstudio.jpeg?w=620&q=90",
      rating: 5,
      created_at: "2024-01-01",
      comment: "Keren Jasanya saya sangat suka",
    },
    {
      id: 2,
      name: "John Doe",
      image_url:
        "https://bungko.desa.id/wp-content/uploads/2024/02/ilustrasi-foto-selfie.jpeg",
      rating: 4,
      created_at: "2024-02-02",
      comment: "Lumayan Membantu sih",
    },
  ],
};

export const dummyOrder = [
  {
    booking_id: 1,
    booking_number: "STLS3213312",
    stylist: {
      user_id: 1,
      name: "Stylist 1",
    },
    customer: {
      user_id: 1,
      name: "Customer 1",
    },
    status: "Accepted",
    booking_details: {
      booking_details_id: 1,
      booking_id: 1,
      booking_time: "11:00",
      booking_date: "2024-05-20",
      payment_details: {
        payment_id: 1,
        payment_type: "BCA Transfer",
      },
    },
  },
  {
    booking_id: 2,
    booking_number: "STLS3213312",
    stylist: {
      user_id: 1,
      name: "Stylist 1",
    },
    customer: {
      user_id: 2,
      name: "Customer 2",
    },
    status: "Accepted",
    booking_details: {
      booking_details_id: 2,
      booking_id: 2,
      booking_time: "13:00",
      booking_date: "2024-05-15",
      payment_details: {
        payment_id: 1,
        payment_type: "BCA Transfer",
      },
    },
  },
];
